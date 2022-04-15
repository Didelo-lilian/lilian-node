const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
	name: { type: String, required: true },
	class: { type: String, required: true },
	cours: [
		{
			month: { type: String, required: true },
			lessons: [
				{
					day: { type: String, required: true },
					title: { type: String, required: true },
					link: { type: String, required: true },
				},
			],
		},
	],
});

module.exports = mongoose.model("Student", studentSchema);
