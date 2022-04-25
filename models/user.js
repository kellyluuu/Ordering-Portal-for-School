const mongoose = require("./connection");

// Use JS destructuring syntax to unpack specific properties from mongoose
const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User Model
const User = model("User", userSchema);


module.exports = User;
