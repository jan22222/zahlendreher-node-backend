const mongoose = require("mongoose");
const {CellSchema} = require("./cell.model.js")
 const TableSchema = mongoose.Schema({
	 title: String,
	 cells: [CellSchema]
});

const TableModel = mongoose.model('TableModel', TableSchema)
module.exports = {TableModel, TableSchema}