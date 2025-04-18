require('dotenv').config();

module.exports = {
    development: {
        username: process.env.USER || 'postgres',
        password: process.env.PASSWORD || 'postgres',
        database: process.env.DATABASE || 'tile_game',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: process.env.USER || 'postgres',
        password: process.env.PASSWORD || 'postgres',
        database: process.env.DATABASE_TEST || 'tile_game_test',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: process.env.USER || 'postgres',
        password: process.env.PASSWORD || 'postgres',
        database: process.env.DATABASE_PROD || 'tile_game_prod',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgres',
    },
};
