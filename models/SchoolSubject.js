const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schoolSubjectSchema = mongoose.Schema({
	level: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  contents : [
    {
      title: { type: String, required: true },
      subcontents: [
        {
          title: { type: String, required: true },
          link: { type: String, required: true },
        },
      ],
    },
  ],
});

schoolSubjectSchema.plugin(uniqueValidator);

module.exports = mongoose.model("SchoolSubject", schoolSubjectSchema);