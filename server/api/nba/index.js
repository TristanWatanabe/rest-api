const router = require("express").Router();

router.use("/teams", require("./teams"));
router.use("/players", require("./players"));
router.use("/games", require("./games"));

module.exports = router;
