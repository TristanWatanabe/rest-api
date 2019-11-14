const Sequelize = require("sequelize");
const db = require("../db");

const GameState = db.define("gameState", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  game_id: {
    type: Sequelize.INTEGER
  },
  home_team_score: {
    type: Sequelize.INTEGER
  },
  away_team_score: {
    type: Sequelize.INTEGER
  },
  broadcast: {
    type: Sequelize.STRING
  },
  quarter: {
    type: Sequelize.INTEGER
  },
  time_left_in_quarter: {
    type: Sequelize.STRING
  },
  game_status: {
    type: Sequelize.STRING
  }
});

module.exports = GameState;
