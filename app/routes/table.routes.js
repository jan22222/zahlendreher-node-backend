
const authJwt = require("../middlewares/authJwt")
    const { updateTable, getTableByTaskId } = require("../controllers/table.controller.js");
    const express = require("express")
    const tableroutes = express.Router();
  
    tableroutes.get("/:id",authJwt.verifyToken, getTableByTaskId);
    
    tableroutes.post("/:id",authJwt.verifyToken, updateTable);

    module.exports = tableroutes 