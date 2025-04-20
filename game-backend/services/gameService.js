const { v4: uuidv4 } = require('uuid');
const { sequelize, Game, Tile, TileType, PlacementRules } = require("../models/index.js");
const {Op} = require("sequelize");
const tileQueueService = require("../services/tileQueueService.js");
const potentialTileService = require("../services/potentialTileService.js");

const redis = require("../config/redis");
const {getNeighbourPositions} = require("../utils/getNeighbourPositions");
const GameError = require("../utils/GameError");


require('dotenv').config()

exports.createGame = async () => {
    const t = await sequelize.transaction()
    try{
        const gameId = uuidv4();
        const tileId = uuidv4();

        const newGame = await Game.create({ id: gameId }, { transaction: t });
        await Tile.create({
            id: tileId,
            gameId,
            tileTypeId: '44444444-4444-4444-4444-444444444444',
            x: 0,
            y: 0,
            isPerfectPlacement: false
        }, { transaction: t });
        await t.commit();

        return newGame;

    }catch(err){
        await t.rollback();
        throw err;
    }
}

exports.getGameData = async (id) => {
    const gameData = await Game.findByPk(id)
    const tiles = await Tile.findAll({
        where: {
            gameId: id
        }
    })

    return { gameData, tiles }
}

exports.processTilePlacement = async (gameId, x, y) => {
    try{
        const redisKey = `potentialTileCoords:${gameId}`
        const potentialTilesCache = await redis.scard(redisKey)

        if(potentialTilesCache === 0){
            await potentialTileService.calculatePotentialTiles(gameId)
        }

        const tileIsPotential = await redis.sismember(redisKey, `${x},${y}`)

        if(!tileIsPotential){
            throw new GameError("Potential Tile could not be found. Wrong tile coordinates.", 403)
        }



        const [currentTile, ...tileQueue] = await redis.lrange(`tileQueue:${gameId}`, 0, -1);
        if (!currentTile) {
            throw new GameError("Tile cache is expired or missing, update tile queue", 409)
        }
        // move on queue
        // await tileQueueService.getTileQueue()

        const tileType = await TileType.findOne({
            where: {
                subtype: currentTile,
            },
        })

        // placement rules

        const placeRules = await PlacementRules.findAll({
            where: {
                tileTypeId: tileType.id
            }
        })

        const neighbourTiles = await Tile.findAll({
            where: {
                gameId,
                [Op.or]: getNeighbourPositions(x,y)
            }
        })

        neighbourTiles.forEach(tile => {
            console.log(tile.tileTypeId)
        })
        if(placeRules.length > 0){
            //calculate bonuses
            // neighbour tiles
            console.log(neighbourTiles)
            console.log("Rules calculating")
        }

    }catch(err){
        console.error(err)
        throw err;
    }
}