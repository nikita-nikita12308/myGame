const redis = require("../config/redis");
const {TileType} = require("../models/index");

exports.getTileQueue = async (gameId, score) => {

    const TTL_SECONDS = process.env.TILE_QUEUE_TTL || 600;
    const queueData = await redis.lrange(`tileQueue:${gameId}`, 0, -1)

    const getRandomTile = () => baseTiles[Math.floor(Math.random() * baseTiles.length)].subtype


    const baseTiles = await TileType.findAll({
        where: {
            type: "base"
        }
    })

    if(!queueData.length) {
        const queue = Array(3).fill().map(() => getRandomTile());
        await redis.lpush(`tileQueue:${gameId}`, ...queue)
    } else {
        await redis.lpop(`tileQueue:${gameId}`)
        await redis.rpush(`tileQueue:${gameId}`, getRandomTile())
    }

    await redis.expire(`tileQueue:${gameId}`, TTL_SECONDS);

    const [currentTile, ...tileQueue] = await redis.lrange(`tileQueue:${gameId}`, 0, -1);

    return {
        currentTile,
        tileQueue,
        score
    }
}