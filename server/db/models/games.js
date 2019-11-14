const Sequelize = require("sequelize");
const db = require("../db");

const Games = db.define("games", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  home_team_id: {
    type: Sequelize.INTEGER
  },
  away_team_id: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.STRING
  }
});

module.exports = Games;
