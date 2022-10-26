const pool = require('../queries');

exports.getStudents = (req, res) => {
    const name = req.params.name;
    const query = name ? `Select * from students where nameStudent = '${name}'` : "Select * from students where noStudent in (select distinct noStudent from lessonsStudent)";
    pool.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            if (result.rows.length > 0) {
                let response = [];
                result.rows.forEach(row => {
                    response.push(row);
                });
                response.sort((a, b) => {
                        return a.namestudent.localeCompare(b.namestudent);
                    }
                );
                res.status(200).send(response);

            } else {
                res.status(404).send("No students found");
            }
        }
    )
    ;
}
;

exports.getAllStudentsName = (req, res) => {
    const query = "Select nameStudent from students where noStudent in (select distinct noStudent from lessonsStudent)";
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (result.rows.length > 0) {
            let response = [];
            result.rows.forEach(row => {
                    response.push(row["namestudent"]);
                }
            );
            response.sort();
            res.status(200).send(response);
        } else {
            res.status(404).send("No students found");
        }
    });
}

exports.createStudent = (req, res) => {
    if (!req.body.name && !req.body.level) {
        res.status(400).send("Missing name and level");
        return;
    }
    if (!req.body.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (!req.body.level) {
        res.status(400).send("Missing level");
        return;
    }

    const verifyLevelOrAddNewLevel = pool.query(`Select noLevel from levelsstudent where nameLevelStudent = '${req.body.level}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        if (result.rows.length === 0) {
            pool.query(`Insert into levelsstudent (nameLevelStudent) values ('${req.body.level}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                    return;
                }
            });
            return result.rows[0].noLevelStudent;
        }
        return result.rows[0].noLevelStudent;
    });

    pool.query(`Insert into students (nameStudent, noLevelStudent) values ('${req.body.name}', '${verifyLevelOrAddNewLevel}')`, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            res.status(201).send("Student created successfully with name: " + req.body.name + " and level: " + req.body.level);
        }
    );
}
;

exports.deleteStudent = (req, res) => {
    if (!req.body.name) {
        res.status(400).send("Missing name");
        return;
    }
    const query = `Delete from students where nameStudent = '${req.body.name}'`;
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send("Student deleted successfully with name: " + req.body.name);
    });
}

exports.updateStudent = (req, res) => {
    if (!req.body.name && !req.body.level) {
        res.status(400).send("Missing name and level");
        return;
    }
    if (!req.body.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (!req.body.level) {
        res.status(400).send("Missing level");
        return;
    }
    const verifyLevelOrAddNewLevel = pool.query(`Select noLevel from levelsstudent where nameLevelStudent = '${req.body.level}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        if (result.rows.length === 0) {
            pool.query(`Insert into levelsstudent (nameLevelStudent) values ('${req.body.level}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                    return;
                }
            });
            return result.rows[0].noLevelStudent;
        }
        return result.rows[0].noLevelStudent;
    });

    const query = `Update students set noLevelStudent = '${verifyLevelOrAddNewLevel}' where nameStudent = '${req.body.name}'`;
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).send("Student updated successfully with name: " + req.body.name + " and level: " + req.body.level);
    });
}
