require("dotenv").config();
const mongoose = require("mongoose");

// Config for connection
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to DB
mongoose.connect(DATABASE_URL, CONFIG);

// Log status messages for connection events
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
