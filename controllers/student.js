const Student = require("../models/Student");

exports.createStudent = (req, res) => {
	const student = new Student({
		name: req.body.name,
		class: req.body.class,
		cours: req.body.cours,
	});
	student
		.save()
		.then((result) => {
			res.status(201).json({
				message: "Student created!",
				createdStudent: {
					name: result.name,
					class: result.class,
					cours: result.cours,
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.getStudents = (req, res) => {
	if (req.body.name) {
		Student.findOne({ name: req.body.name })
			.then((student) => res.json({ message: "Student found", student }))
			.catch((err) =>
				res
					.status(404)
					.json({ noStudentFound: "No student found with that ID" })
			);
	} else {
		Student.find()
			.then((students) => res.json({ message: "Students found", students }))
			.catch((err) =>
				res.status(404).json({ noStudentsFound: "No students found" })
			);
	}
};

exports.getStudent = (req, res) => {
	Student.findOne({ name: req.params.name })
		.then((student) => {
			console.log(req.params.name, student);
			res.json({ message: "Student found", student });
		})
		.catch((err) =>
			res.status(404).json({ noStudentFound: "No student found with that ID" })
		);
};

exports.deleteStudent = (req, res) => {
	Student.findOneAndDelete({ name: req.body.name })
		.then((student) => res.json({ message: "Student deleted" }))
		.catch((err) =>
			res.status(404).json({ noStudentFound: "No student found" })
		);
};

exports.updateStudent = (req, res) => {
	Student.findOne({ name: req.body.name })
		.then((student) => {
			if (req.body.month && req.body.lessons) {
				let isMonthExist = false;
				student.cours.forEach((element) => {
					if (element.month === req.body.month) {
						element.lessons.push(req.body.lessons);
						isMonthExist = true;
					}
				});
				if (!isMonthExist) {
					student.cours.push({
						month: req.body.month,
						lessons: [req.body.lessons],
					});
				}
			} else if (req.body.lessons && !req.body.month) {
				student.cours[student.course.length - 1].lessons.push(req.body.lessons);
			} else {
				res.status(400).json({
					message: "You need to provide a month and a lesson",
				});
			}
			Student.updateOne({ name: req.body.name }, student)
				.then(() => res.json({ message: "Student updated!", student }))
				.catch((err) =>
					res.status(400).json({ error: "Unable to update student" })
				);
		})
		.catch((err) =>
			res.status(404).json({ noStudentFound: "No student found" })
		);
};
