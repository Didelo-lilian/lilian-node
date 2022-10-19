const pool = require('../queries');

exports.createStudent = (req, res) => {
	if(!req.body.name && req.body.level){
		res.status(400).json({ message : "Please provide a name and a level" });
		return;
	}

	pool.query('INSERT INTO students (name, level) VALUES ($1, $2)', [req.body.name, req.body.level], (error, results) => {
		if (error) {
			res.status(400).json({error: error});
			return;
		}
		res.status(201).json( {message : `Student added with name: ${req.body.name}, level: ${req.body.level}` })
	});
}

exports.getStudents = (req, res) => {
	console.log(req.params);
	if(req.params.name && req.params.name == "all" && req.params.level && req.params.level == "all" || (!req.params.name && !req.params.level)){
		pool.query('SELECT * FROM students', (error, results) => {
			if (error) {
				res.status(400).json({error: error});
				return;
			}
			if(results.rows.length == 0) {
				res.status(404).json({ message : "No students found" });
				return;
			}
			res.status(200).json(results.rows);
		});
		return;
	}

	if(req.params.level && (req.params.name && req.params.name == "all")){
		pool.query('SELECT * FROM students WHERE level = $1', [req.params.level], (error, results) => {
			if (error) {
				res.status(400).json({error: error});
				return;
			}
			if(results.rows.length == 0){
				res.status(404).json({message: "Student(s) with level " + req.params.level + " not found"});
				return;
			}
			res.status(200).json(results.rows);
		});
		return;
	}

	if(req.params.name && (req.params.level && req.params.level == "all")){
		pool.query('SELECT * FROM students WHERE name = $1', [req.params.name], (error, results) => {
			if (error) {
				res.status(400).json({error: error});
				return;
			}
			if(results.rows.length == 0){
				res.status(404).json({message: "Student(s) with name " + req.params.name + " not found"});
				return;
			}
			res.status(200).json(results.rows);
		});
		return;
	}

	if(req.params.name && req.params.level){
		pool.query('SELECT * FROM students WHERE name = $1 AND level = $2', [req.params.name, req.params.level], (error, results) => {
			if (error) {
				res.status(400).json({error: error});
				return;
			}
			if(results.rows.length == 0){
				res.status(404).json({message: "Student with name " + req.params.name + " and level " + req.params.level + " not found"});
				return;
			}
			res.status(200).json(results.rows);
		});
	}
}

exports.deleteStudent = (req, res) => {
	if(!req.body.name){
		res.status(400).json({ message : "Please provide at least a name" });
		return;
	}

	if(!req.body.level){
		pool.query('DELETE FROM students WHERE name = $1', [req.body.name], (error, results) => {
			if (error) {
				res.status(400).json({error: error});
				return;
			}
			if (results.rowCount == 0) {
				res.status(404).json({ message : "Student not found with name: " + req.body.name });
				return;
			}
			res.status(200).json( {message : `Student deleted with name: ${req.body.name}` })
		});
		return;
	}

	pool.query('DELETE FROM students WHERE name = $1 AND level = $2', [req.body.name, req.body.level], (error, results) => {
		if (error) {
			res.status(400).json({error: error});
			return;
		}
		if (results.rowCount == 0) {
			res.status(404).json({ message : "Student not found with name: " + req.body.name + " and level: " + req.body.level });
			return;
		}
		res.status(200).json( {message : `Student deleted with name: ${req.body.name}, level: ${req.body.level}` })
	}
	);
}

exports.updateStudent = (req, res) => {
	if(!req.body.name || !req.body.level || !req.body.newName || !req.body.newLevel){
		res.status(400).json({ message : "Please provide actual student (name, level) and new student (newName, newLevel)" });
		return;
	}

	pool.query('UPDATE students SET level = $1 , name = $2 WHERE name = $3 AND level = $4', [req.body.newLevel, req.body.newName, req.body.name, req.body.level], (error, results) => {
		if (error) {
			res.status(400).json({error: error});
			return;
		}
		if (results.rowCount == 0) {
			res.status(404).json({ message : "Student not found with name: " + req.body.name });
			return;
		}
		res.status(200).json( {message : `Student (name: ${req.body.name}, level: ${req.body.level}) updated with (name: ${req.body.newName}, level: ${req.body.newLevel})` });
	});
}
