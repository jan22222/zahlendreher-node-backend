    const  authJwt  = require("../middlewares/authJwt");
    const coworkers = require("../controllers/coworker.controller.js");
    const express = require ( "express")
    const coworkerroutes = express.Router();
    coworkerroutes.get("/all",[authJwt.verifyToken, authJwt.findRole], coworkers.findAll);
    coworkerroutes.post("/add",[authJwt.verifyToken, authJwt.findRole], coworkers.addCoworker);

    // Delete a single coworker with id
    coworkerroutes.delete("/:id",[authJwt.verifyToken, authJwt.findRole], coworkers.deleteOne);
 

  module.exports = coworkerroutes