const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const homeSchema = mongoose.Schema({
	language: { type: String, required: true, unique: true },
	paragraphs: [
		{
			text: { type: String, required: true },
		},
	],
});

homeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Home", homeSchema);
