const router = require("express").Router();
const { Teams } = require("../../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const team = await Teams.findByPk(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.send("Team Not Found");
    }
  } catch (error) {
    next(error);
  }
});
