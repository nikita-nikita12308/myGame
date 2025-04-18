const gameService = require('../services/gameService');
const tileQueueService = require('../services/tileQueueService');
const potentialTileService = require('../services/potentialTileService');

exports.startGame = async (req, res) => {
    try{
        const newGame = await gameService.createGame();
        res.status(201).json({gameId: newGame.id});
    }catch(err){
        res.status(500).json({error: "Failed to create a game: ", details: err});
    }
}

exports.getGame = async (req, res) => {
    try{
        const game = req.game;
        res.status(200).json(game)
    }catch(err){
        res.status(500).json({error: "Failed to get a game: ", details: err});
    }
}

exports.getTileQueue = async (req, res) => {
    try{
        const id = req.params.id
        const game = req.game;
        const tileQueue = await tileQueueService.getTileQueue(id, game.gameData.score)
        res.status(200).json(tileQueue)
    }catch(err){
        res.status(500).json({error: "Failed to get a tile queue: ", details: err});
    }
}

exports.getPotentialTiles = async (req, res) => {
    try{
        const gameId = req.params.id;
        const potentialTiles = await potentialTileService.calculatePotentialTiles(gameId);
        res.status(200).json(potentialTiles)
    }catch (err) {
        res.status(500).json({error: "Failed to get potential tiles from game", err});
    }
}

exports.placeTile = async (req, res) => {
    try{
        const { x, y } = req.body;
        const result = gameService.processTilePlacement(req.params.id, x, y);
        res.status(201).json({success: true, data: result.data});
    }catch(err){
        res.status(500).json({error: "Failed to place a tile"});
    }
}
