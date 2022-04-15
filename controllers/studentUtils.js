const StudentUtils = require("../models/StudentUtils");

exports.createStudentUtils = (req, res) => {
	const studentUtils = new StudentUtils({
		title: req.body.title,
		link: req.body.link,
	});
	studentUtils
		.save()
		.then((result) => {
			res.status(201).json({
				message: "StudentUtils created!",
				createdStudentUtils: {
					title: result.title,
					link: result.link,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.getStudentUtils = (req, res) => {
  if(req.body.title){
    StudentUtils.findOne({ title: req.body.title })
    .then((studentUtils) => res.json({message: "StudentUtils found", studentUtils}))  
    .catch((err) =>
      res.status(404).json({ noStudentUtilsFound: "No studentUtils found with that ID" })
    );
  } else {
	StudentUtils.find()
		.then((studentUtils) => {
			res.json(studentUtils);
		})
		.catch((err) =>
			res.status(404).json({ noStudentUtilsFound: "No student utils found" })
		);
  }
};

exports.deleteStudentUtils = (req, res) => {
	StudentUtils.findOneAndDelete({ title: req.body.title })
		.then((studentUtils) => res.json({ message: "Student utils deleted" }))
		.catch((err) =>
			res.status(404).json({ noStudentUtilsFound: "No student utils found" })
		);
};

exports.updateStudentUtils = (req, res) => {
  StudentUtils.findOneAndUpdate({ title: req.body.title }, {
    title: req.body.title,
    link: req.body.link,
  })
    .then((studentUtils) => {
      res.json(studentUtils);
    }
    )
    .catch((err) =>
      res.status(404).json({ noStudentUtilsFound: "No student utils found" })
    );
}
