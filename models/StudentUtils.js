const mongoose = require("mongoose");

const studentUtilsSchema = mongoose.Schema({
	title: { type: String, required: true },
	link: { type: String, required: true },
});

module.exports = mongoose.model("Studentutils", studentUtilsSchema);
