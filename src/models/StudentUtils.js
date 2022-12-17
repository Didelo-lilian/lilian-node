const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentUtilsSchema = mongoose.Schema({
	title: { type: String, required: true, unique: true },
	link: { type: String, required: true },
});

studentUtilsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Studentutils", studentUtilsSchema);
