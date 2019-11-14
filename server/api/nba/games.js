const router = require("express").Router();
const { Games, GameState } = require("../../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    //fetches all games that happened on a specific date
    if (req.query.date) {
      const date = parseDate(req.query.date);
      //fetch all games that occured on specified date
      const games = await Games.findAll({
        where: {
          date: date
        }
      });
      let allGames = [];
      //find all gameStates during specified date by gameId
      for (let i = 0; i < games.length; i++) {
        const gameId = games[i].dataValues.id;
        const gms = await GameState.findAll({
          where: {
            game_id: gameId
          },
          include: [{ model: Games }]
        });
        allGames.push(...gms);
      }

      allGames.length ? res.json(allGames) : res.send("No games found");
    } else {
      //since the Games table has no foreign key to the GameState table,
      //I decided to make the fetch using GameState instead of Games
      //so I'm able to eager load and fetch all with just one database call
      let games = await GameState.findAll({
        include: [{ model: Games }]
      });

      games.length ? res.json(games) : res.send("No games found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //fetches specified game
    let game = await Games.findOne({
      where: {
        id: req.params.id
      }
    });
    if (game) {
      //fetches corresponding GameState of specified Game
      const gameState = await GameState.findOne({
        where: {
          id: game.dataValues.id
        }
      });
      //attaches gameState to the game object that was fetched earlier
      game.dataValues.gameState = gameState.dataValues;
    }

    game ? res.json(game) : res.send("Game not found");
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
