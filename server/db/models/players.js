const Sequelize = require("sequelize");
const db = require("../db");

const Players = db.define("players", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  team_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Players;
