const express = require("express");
const authroutes = express.Router();
  
  const  verifySignUp  = require("../middlewares/verifySignup");
  const controller = require("../controllers/auth.controller");
  
  authroutes.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  authroutes.post("/signin", controller.signin);

  module.exports = authroutes