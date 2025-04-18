const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')


module.exports = (sequelize) => {
    const Game = sequelize.define('Game', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM("in_progress", "finished"),
            defaultValue: "in_progress",
        }
    },{
        timestamps: true
    })
    return Game;
}