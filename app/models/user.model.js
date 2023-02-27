const mongoose = require("mongoose");
const Role = require("./role.model")
const {TaskSchema} = require("./task.model")

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tasks:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false}],
    role:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true},
    coworkers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = User;