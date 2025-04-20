class GameError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'GameError';
        this.statusCode = statusCode;
    }
}

module.exports = GameError;