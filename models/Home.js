const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
	language: { type: String, required: true },
	paragraphs: [
		{
			text: { type: String, required: true },
		},
	],
});

module.exports = mongoose.model("Home", homeSchema);
