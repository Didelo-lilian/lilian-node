const pool = require('../utils/queries');
const cache = require('../utils/cache');


exports.getStudents = (req, res) => {
    if (!req.params.name) {
        res.status(400).send("Missing name");
        return;
    }
    if (cache.get("students")) {
        cache.get("students").forEach(student => {
                if (student.name === req.params.name) {
                    res.status(200).json(student);
                }
            }
        );
        return;
    }
    const query = "Select nameStudent, nameLevelStudent from students natural join levelsStudent where nameStudent = '" + req.params.name + "'";
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
            return;
        }
        if (result === undefined) {
            res.status(404).json({error: "No student found"});
            return;
        }
        if (result.rows === undefined) {
            res.status(404).json({error: "No student found"});
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
        res.status(200).json(cache.get("students"));
        return;
    }
    const query = "Select nameStudent from students where noStudent in (select distinct noStudent from lessonsStudent) order by nameStudent";
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
        if (result.rows.length > 0) {
            let response = [];
            result.rows.forEach(row => {
                    response.push(row["namestudent"]);
                }
            );
            response.sort();
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "No student found"});
        }
    });
}

exports.createStudent = (req, res) => {
    if (!req.body.name && !req.body.level) {
        res.status(400).json({error: "Missing name and level"});
        return;
    }
    if (!req.body.name) {
        res.status(400).json({error: "Missing name"});
        return;
    }
    if (!req.body.level) {
        res.status(400).json({error: "Missing level"});
        return;
    }

    const verifyLevelOrAddNewLevel = pool.query(`Select noLevel from levelsstudent where nameLevelStudent = '${req.body.level}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
            return;
        }
        if (result.rows.length === 0) {
            pool.query(`Insert into levelsstudent (nameLevelStudent) values ('${req.body.level}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: err});
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
                res.status(500).json({error: err});
                return;
            }
            res.status(201).json({
                message: "Student created successfully",
                student: {name: req.body.name, level: req.body.level}
            });
        }
    );
}
;

exports.deleteStudent = (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: "Missing name"});
        return;
    }
    const query = `Delete from students where nameStudent = '${req.body.name}'`;
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
        res.status(200).json({message: "Student deleted successfully"});
    });
}

exports.updateStudent = (req, res) => {
    if (!req.body.name && !req.body.level) {
        res.status(400).json({error: "Missing name and level"});
        return;
    }
    if (!req.body.name) {
        res.status(400).json({error: "Missing name"});
        return;
    }
    if (!req.body.level) {
        res.status(400).json({error: "Missing level"});
        return;
    }
    const verifyLevelOrAddNewLevel = pool.query(`Select noLevel from levelsstudent where nameLevelStudent = '${req.body.level}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
            return;
        }
        if (result.rows.length === 0) {
            pool.query(`Insert into levelsstudent (nameLevelStudent) values ('${req.body.level}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: err});
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
            res.status(500).json({error: err});
        }
        res.status(200).json({message: "Student updated successfully"});
    });
}
