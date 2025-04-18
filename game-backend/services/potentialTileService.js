const {Tile} = require("../models/index");
const redis = require("../config/redis");

exports.calculatePotentialTiles = async (gameId) => {
    try{
        const tiles = await Tile.findAll({
            where: { gameId }
        })

        const redisKey = `potentialTileCoords:${gameId}`
        const cache = await redis.scard(redisKey)

        let placedTiles = tiles.map((tile) => { return { x: tile.x, y: tile.y } })
        const placedTilesSet = new Set(placedTiles.map((t) => `${t.x},${t.y}`))

        if(cache > 0){
            placedTiles = await Tile.findOne({
                where: { gameId },
                attributes: ['x', 'y'],
                order: [['placedAt', 'DESC']],
                raw: true
            })

            placedTiles = [placedTiles]
            await redis.srem(redisKey, `${placedTiles[0].x},${placedTiles[0].y}`);
        }
        const potentialTiles = new Set()

        placedTiles.forEach(({x, y}) => {

            const potentialTilesArray = [
                `${x + 1},${y}`,
                `${x - 1},${y}`,
                `${x},${y + 1}`,
                `${x},${y - 1}`
            ]

            potentialTilesArray.forEach(e => potentialTiles.add(e))
        })

        const filteredPotentialTiles = Array.from(potentialTiles).filter(t => !placedTilesSet.has(t))

        await redis.sadd(redisKey, ...filteredPotentialTiles)
        await redis.expire(redisKey, 600)

        const allTilesFromCache = await redis.smembers(redisKey)

        const result = allTilesFromCache.map((tile) => {
            const [x, y] = tile.split(",").map(Number)
            return { x, y}
        })

        return {
            tilesCount: result.length,
            potentialTiles: result
        }
    }catch (e){
        console.error(e)
        throw e
    }
}