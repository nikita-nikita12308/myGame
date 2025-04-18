const { DataType, DataTypes} = require("sequelize");


module.exports = (sequelize) => {
    const tileType = sequelize.define("tileType", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        type: {
            type: DataTypes.ENUM("base", "camp", "wonder"),
            allowNull: false,
            defaultValue: "base",
        },
        subtype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        basePoints: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        resourceType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        baseResource: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        timestamps: false,
        tableName: "TileTypes",
    })
    return tileType
}