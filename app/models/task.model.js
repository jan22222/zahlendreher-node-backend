const mongoose = require("mongoose");
const {TableSchema} = require("./table.model.js")
const TaskSchema = mongoose.Schema({
    title:{
      type: String,
      required: true
    },
	description:{
		type: String,
    required: true
  },
  table:{
		type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: false
  },
	coworker:
	{
		  type: mongoose.Schema.Types.ObjectId,
      ref:"User"
	},
}, { timestamps: true });
 
const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = { TaskSchema, TaskModel }