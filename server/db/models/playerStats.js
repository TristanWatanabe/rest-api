const Sequelize = require("sequelize");
const db = require("../db");

const PlayerStats = db.define("playerStats", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  game_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "games",
      key: "id"
    }
  },
  player_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "players",
      key: "id"
    }
  },
  team_id: {
    type: Sequelize.INTEGER
  },
  points: {
    type: Sequelize.INTEGER
  },
  assists: {
    type: Sequelize.INTEGER
  },
  rebounds: {
    type: Sequelize.INTEGER
  },
  nerd: {
    type: Sequelize.DECIMAL
  }
});

module.exports = PlayerStats;
