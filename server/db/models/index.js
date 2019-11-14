const Games = require("./games");
const GameState = require("./gameState");
const Players = require("./players");
const PlayerStats = require("./playerStats");
const Teams = require("./teams");

PlayerStats.belongsTo(Players, { foreignKey: "player_id" });
PlayerStats.belongsTo(Games, { foreignKey: "game_id" });
GameState.belongsTo(Games, { foreignKey: "game_id" });

module.exports = {
  Games,
  GameState,
  Players,
  PlayerStats,
  Teams
};
