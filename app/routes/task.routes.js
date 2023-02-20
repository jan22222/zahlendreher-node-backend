const  authJwt  = require("../middlewares/authJwt");

  const tasks = require("../controllers/task.controller.js");
  const express = require("express")
  const taskroutes = express.Router();
  taskroutes.get("/all",[authJwt.verifyToken, authJwt.findRole], tasks.getTasks);
  taskroutes.post("/create",[authJwt.verifyToken, authJwt.findRole], tasks.saveTask);

  taskroutes.get("/:id",authJwt.verifyToken, tasks.getTaskById);
  


  // Delete a single task with id
  taskroutes.delete("/:id",[authJwt.verifyToken, authJwt.findRole], tasks.deleteTask);

  module.exports = taskroutes 