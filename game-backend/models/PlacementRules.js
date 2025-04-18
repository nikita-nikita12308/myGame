const { DataType, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const PlacementRules = sequelize.define('PlacementRules', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        tileTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        neighbourSubtype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        minNeighborCount: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        neighbourDirection: {
            type: DataTypes.ENUM("any", "orthogonal", "diagonal"),
            defaultValue: "any",
        },
        bonusPerTile: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        perfectPlacementCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        perfectPlacementBonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    },{
        timestamps: false,
        tableName: 'PlacementRules',
    })
    return PlacementRules;
}