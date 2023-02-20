//Hinweise: Muss initiiert werden in der Datenbank mit Soll und Haben
const mongoose = require("mongoose");

const CellSchema = new mongoose.Schema({
	order:{
   		type:Number,
		required: true,
		unique: true
	},
	value:{
   		type:Number,
		default: 0
	}
});

const Soll = mongoose.model('Soll', CellSchema);
const Haben = mongoose.model('Haben', CellSchema);

module.exports = {Soll, Haben, CellSchema}