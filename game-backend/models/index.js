const { Sequelize} = require('sequelize');
const sequelize = require('../config/sequelize')

const GameModel = require('../models/Game');
const TileModel = require('../models/Tile');
const TileTypeModel = require('../models/TileType');
const PlacementRulesModel = require('../models/PlacementRules');
const TileResourceModel = require('../models/TileResource');

const Game = GameModel(sequelize);
const Tile = TileModel(sequelize);
const TileType = TileTypeModel(sequelize);
const PlacementRules = PlacementRulesModel(sequelize);
const TileResource = TileResourceModel(sequelize);

Game.hasMany(Tile, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Tile.belongsTo(Game, { foreignKey: 'gameId' });

Tile.belongsTo(TileType, { foreignKey: 'tileTypeId' });
TileType.hasMany(Tile, { foreignKey: 'tileTypeId' });

TileType.hasMany(TileResource, { foreignKey: 'tileTypeId', as: 'resources' });
TileResource.belongsTo(TileType, { foreignKey: 'tileTypeId' });

TileType.hasMany(PlacementRules, { foreignKey: 'tileTypeId', as: 'placementRules' });
PlacementRules.belongsTo(TileType, { foreignKey: 'tileTypeId' } );

module.exports = {
    sequelize,
    Game,
    Tile,
    TileType,
    PlacementRules,
    TileResource,
}