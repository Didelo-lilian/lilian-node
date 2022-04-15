const mongoose = require("mongoose");

const schoolSubjectSchema = mongoose.Schema({
	level: { type: String, required: true },
  title: { type: String, required: true },
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

module.exports = mongoose.model("SchoolSubject", schoolSubjectSchema);