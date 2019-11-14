const fs = require("fs");
const db = require("../server/db");
const {
  Games,
  GameState,
  Players,
  PlayerStats,
  Teams
} = require("../server/db/models");

const games = JSON.parse(fs.readFileSync("games.json", "utf8"));
const gameState = JSON.parse(fs.readFileSync("gameState.json", "utf8"));
const players = JSON.parse(fs.readFileSync("players.json", "utf8"));
const playerStats = JSON.parse(fs.readFileSync("playerStats.json", "utf8"));
const teams = JSON.parse(fs.readFileSync("teams.json", "utf8"));

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  await Promise.all(
    games.map(game => {
      return Games.create({
        id: game.id,
        home_team_id: game.home_team_id,
        away_team_id: game.away_team_id,
        date: game.date
      });
    })
  );

  await Promise.all(
    gameState.map(game => {
      return GameState.create({
        id: game.id,
        game_id: game.game_id,
        home_team_score: game.home_team_score,
        away_team_score: game.away_team_score,
        broadcast: game.broadcast,
        quarter: game.quarter,
        time_left_in_quarter: game.time_left_in_quarter,
        game_status: game.game_status
      });
    })
  );

  await Promise.all(
    players.map(player => {
      return Players.create({
        id: player.id,
        name: player.name,
        team_id: player.team_id
      });
    })
  );

  await Promise.all(
    playerStats.map(player => {
      return PlayerStats.create({
        id: player.id,
        game_id: player.game_id,
        player_id: player.player_id,
        team_id: player.team_id,
        points: player.points,
        assists: player.assists,
        rebounds: player.rebounds,
        nerd: player.nerd
      });
    })
  );

  await Promise.all(
    teams.map(team => {
      return Teams.create({
        id: team.id,
        city: team.city,
        full_name: team.full_name,
        abbrev: team.abbrev
      });
    })
  );

  console.log("Seeding Successful");
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
