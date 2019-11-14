const router = require("express").Router();

router.use("/nba", require("./nba"));

module.exports = router;
