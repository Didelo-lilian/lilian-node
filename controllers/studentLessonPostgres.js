const pool = require('../queries');

exports.createStudentLesson = async (req, res) => {
	console.log(req.body);
	if (!req.body.title || !req.body.link || !req.body.month || !req.body.year || !req.body.name) {
		let message = "Please provide : ";
		if (!req.body.title) message += "title, ";
		if (!req.body.link) message += "link, ";
		if (!req.body.month) message += "month(int), ";
		if (!req.body.year) message += "year(int), ";
		if (!req.body.name) message += "name, ";
		res.status(400).json({message: message});
		return;
		console.log("body is complete");
	}
	if (req.body.year < 2018) {
		res.status(400).json({message: "Year must be 2018 or greater"});
		return;
	}
	console.log("year is valid");
	if (req.body.month < 1 || req.body.month > 12) {
		res.status(400).json({message: "Month must be between 1 and 12"});
		return;
	}
	console.log("month is valid");

	await pool.query('SELECT count(*) FROM students WHERE name = $1', [req.body.name], (error, results) => {
		if (error) {
			console.log('error in student not found');
			res.status(400).json({error: error});
			return;
		}
		if (results.rows[0].count == 0) {
			res.status(404).json({message: "Student with name " + req.body.name + " not found"});
			return;
		}
		console.log('student found');
	});

	await pool.query('SELECT count(*) FROM lessons WHERE title = $1 and link = $2 and month = $3 and year = $4', [req.body.title, req.body.link, req.body.month, req.body.year], (error, results) => {
		console.log(results.rows[0].count);
		if (error) {
			console.log('error in lesson already exists');
			res.status(400).json({error: error});
			return;
		}
		if (results.rows[0].count > 0) {
			res.status(400).json({message: "Lesson already exists"});
			return;
		}
		console.log('lesson does not exist');
	});

	await pool.query('INSERT INTO lessons (title, link, month, year, name) VALUES ($1, $2, $3, $4, $5)', [req.body.title, req.body.link, req.body.month, req.body.year, req.body.name], (error, results) => {
		if (error) {
			console.log('error in insert');
			res.status(400).json({error: error});
			return;
		}
		res.status(201).json({message: `Student lesson added with title: ${req.body.title}, link: ${req.body.link}, month: ${req.body.month}, year: ${req.body.year}, name: ${req.body.name}`})
	});
}

exports.getStudentLessons = (req, res) => {

}

exports.getAllStudentLessons = (req, res) => {
	pool.query('SELECT * FROM student_lessons', (error, results) => {
		if (error) {
			res.status(400).json({error: error});
			return;
		}
		if(results.rows.length == 0) {
			res.status(404).json({ message : "No student lessons found" });
			return;
		}
		res.status(200).json(results.rows);
	});
}

exports.getStudentLessonsUtils = (req, res) => {

}


