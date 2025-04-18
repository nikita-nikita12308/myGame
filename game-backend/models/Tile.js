const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tile = sequelize.define("Tile", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tileTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        isPerfectPlacement: {
            type: DataTypes.BOOLEAN,
        },
        bonusApplied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        resourceAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        placedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },{
        timestamps: false,
        tableName: 'Tiles',
    })
    return Tile
}