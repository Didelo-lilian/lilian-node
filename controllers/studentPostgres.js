const pool = require('../queries');
const cache = require('../cache');


exports.getStudents = (req, res) => {
    if (!req.params.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (cache.get("students")) {
        cache.get("students").forEach(student => {
                if (student.name === req.params.name) {
                    res.status(200).send(student);
                    return;
                }
            }
        );
        return;
    }
    const query = "Select nameStudent, nameLevelStudent from students natural join levelsStudent where nameStudent = '" + req.params.name + "'";
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        if (result === undefined) {
            res.status(404).json("No students found");
            return;
        }
        if (result.rows === undefined) {
            res.status(404).json("No students found");
            return;
        }
        if (result.rows.length > 0) {
            let response = [];
            result.rows.forEach(row => {
                    response.push({name: row["namestudent"], level: row["namelevelstudent"]});
                }
            );
            response.sort();
            res.status(200).json(response);
        }
    });
};

exports.getAllStudentsName = (req, res) => {
    if (cache.get("students")) {
        res.status(200).send(cache.get("students"));
        return;
    }
    const query = "Select nameStudent from students where noStudent in (select distinct noStudent from lessonsStudent) order by nameStudent";
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
