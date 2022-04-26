const SchoolSubject = require("../models/SchoolSubject");

exports.createSchoolSubject = (req, res) => {
	const schoolSubject = new SchoolSubject({
		level: req.body.level,
		title: req.body.title,
		contents: req.body.contents,
	});
	schoolSubject
		.save()
		.then((result) => {
			res.status(201).json({
				message: "SchoolSubject created!",
				createdSchoolSubject: {
					level: result.level,
					title: result.title,
					contents: result.contents,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.getSchoolSubject = (req, res) => {
	console.log(req.params.title);
	if (req.params.title) {
		SchoolSubject.find({ title: req.params.title })
			.then((schoolSubject) =>
				res.json({ message: "SchoolSubject found", schoolSubject })
			)
			.catch((err) =>
				res
					.status(404)
					.json({
						noSchoolSubjectFound: "No school subject found with that ID",
					})
			);
	} else {
		SchoolSubject.find()
			.then((schoolSubject) => {
				res.json(schoolSubject);
			})
			.catch((err) =>
				res
					.status(404)
					.json({ noSchoolSubjectFound: "No school subject found" })
			);
	}
};

exports.deleteSchoolSubject = (req, res) => {
	SchoolSubject.findOneAndDelete({ title: req.body.title })
		.then((schoolSubject) => res.json({ message: "School subject deleted" }))
		.catch((err) =>
			res.status(404).json({ noSchoolSubjectFound: "No school subject found" })
		);
};

exports.updateSchoolSubject = (req, res) => {
	SchoolSubject.findOneAndUpdate(
		{ title: req.body.title },
		{
			level: req.body.level,
			title: req.body.title,
			contents: req.body.contents,
		}
	)
		.then((schoolSubject) => {
			res.json(schoolSubject);
		})
		.catch((err) =>
			res.status(404).json({ noSchoolSubjectFound: "No school subject found" })
		);
};
