const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./db");

module.exports = app;

const createApp = () => {
  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", require("./api"));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "..", "public")));

  // sends index.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  // Error catching endware
  app.use((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}  http://localhost:${PORT}/`)
  );
};

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
