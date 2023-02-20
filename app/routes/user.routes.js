const  authJwt  = require("../middlewares/authJwt");
const {getUsers, getUserById, deleteUser} = require("../controllers/user.controller.js")
// const {
//   creatorBoard,
//   adminBoard,
//   editorBoard
// } = require("../controllers/user.controller");

//Einstieg über dashboard.3x:

const express = require("express")
  // const tasks = require("../controllers/task.controller.js");
  const routes = express.Router();
  routes.get(
    "/all",
    [authJwt.verifyToken, authJwt.findRole],
    getUsers
  );
  routes.get(
    "/:id",
    [authJwt.verifyToken, authJwt.findRole],
    getUserById
  );
  routes.delete(
    "/delete/:id",
    [authJwt.verifyToken, authJwt.findRole],
    deleteUser
  );

  module.exports = routes