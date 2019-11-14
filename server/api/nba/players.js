const router = require("express").Router();
const { Players, Games, PlayerStats } = require("../../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    //fetches all players that played on a specific date
    if (req.query.date) {
      const date = parseDate(req.query.date);
      //fetch all games that occured on specified date
      const games = await Games.findAll({
        where: {
          date: date
        }
      });

      let result = [];
      //find all players that played during specified date by gameId
      for (let i = 0; i < games.length; i++) {
        const gameId = games[i].dataValues.id;
        const players = await PlayerStats.findAll({
          where: {
            game_id: gameId
          },
          include: [{ model: Players }]
        });
        result.push(...players);
      }
      //parses data so only Player information is returned
      const allPlayers = getPlayers(result);

      allPlayers.length
        ? res.json(allPlayers)
        : res.send("Nobody played on this day :(");
    }
    //fetches all players from database
    else {
      const players = await Players.findAll();
      res.json(players);
    }
  } catch (error) {
    next(error);
  }
});

//Fetches single team from database
router.get("/:id", async (req, res, next) => {
  try {
    const player = await Players.findByPk(req.params.id);
    player ? res.json(player) : res.send("Player Not Found");
  } catch (error) {
    next(error);
  }
});
//Fetches specific player's stats
router.get("/:id/stats", async (req, res, next) => {
  try {
    const playerStats = await PlayerStats.findAll({
      where: {
        player_id: req.params.id
      }
    });
    playerStats.length
      ? res.json(playerStats)
      : res.send("No stats found for this player");
  } catch (error) {
    next(error);
  }
});

//parses date query into same 1/1/2016 format as our database
function parseDate(date) {
  let result = "";
  let count = 0;
  for (let i = 0; i < date.length; i++) {
    //if zero is in front of month or day, ignore
    if ((count === 0 || count === 2) && date[i] === "0") {
      count++;
      continue;
    } else {
      result += date[i];
      count++;
      if (count === 2 || count === 4) result += "/";
    }
  }
  return result;
}
// parses nested array data received from database query and
// returns just the player data
function getPlayers(players) {
  let allPlayers = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i].dataValues.player;
    allPlayers.push(player);
  }
  return allPlayers;
}
