const mongoose = require("mongoose");
const dotEnv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception, Shutting down...");
  process.exit(1);
});

dotEnv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("DB connection Successful"))
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection, Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM recieved! Shutting down gracefull...");
  server.close(() => {
    console.log("Process terminated!");
  });
});
