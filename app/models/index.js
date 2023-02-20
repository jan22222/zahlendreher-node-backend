const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const {Soll, Haben} = require("./cell.model");
db.soll = Soll;
db.haben = Haben;
db.table = require("./task.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.task = require("./task.model");
db.ROLES = ["editor", "admin", "creator"];

module.exports = db;