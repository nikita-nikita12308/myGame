const { DataType, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const TileResource = sequelize.define('TileResources', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        tileTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        resourceType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resourceAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        timestamps: false,
        tableName: 'TileResources',
    })

    return TileResource;
}