const { Sequelize } = require("sequelize");

require('dotenv').config()

const sequelize = new Sequelize({
    host: process.env.HOST || 'localhost',
    port: 5432,
    dialect: "postgres",
    username: process.env.USER || 'postgres',
    password: process.env.PASSWORD || 'postgres',
    database: process.env.DATABASE || 'tile_game',
    logging: false
})

module.exports = sequelize