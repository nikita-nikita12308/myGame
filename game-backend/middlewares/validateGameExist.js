const gameService = require("../services/gameService");

exports.validateGameExist = async (req, res, next) => {
    const gameId = req.params.id || req.body.gameId || req.query.gameId;

    const game = await gameService.getGameData(gameId);

    if (!game) {
        return res.status(404).json({ error: 'No game found with id: ' + gameId });
    }

    req.game = game;

    next()
}