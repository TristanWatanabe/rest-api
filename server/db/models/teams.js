const Sequelize = require("sequelize");
const db = require("../db");

const Teams = db.define("teams", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  city: {
    type: Sequelize.STRING
  },
  full_name: {
    type: Sequelize.STRING
  },
  abbrev: {
    type: Sequelize.STRING
  }
});

module.exports = Teams;
