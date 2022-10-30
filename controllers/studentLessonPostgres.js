const pool = require('../queries');
const cache = require("../cache");

exports.createStudentLesson = async (req, res) => {

}

function isInKey(output, key, value) {
    if (output.length === 0) {
        return {exist: false, index: -1, status: "empty"};
    }
    if (output[0][key] === undefined) {
        return {exist: false, index: -1, status: "key " + key + " not found"};
    }
    let res = {exist: false, index: -1, status: "not found"};
    output.forEach((row, index) => {
            if (row[key] == value) {
                res = {exist: true, index: index, status: "found"};
                return;
            }
        }
    );
    return res;
}

exports.getStudentLessons = (req, res) => {
    if (!req.params.student) {
        res.status(400).json({message: "No student name found"});
        return;
    }
    if (cache.get('lessons')) {
        if (cache.get('lessons')[req.params.student]) {
            res.status(200).json(cache.get('lessons')[req.params.student]);
            return;
        }
    }
    pool.query("select nameStudent, nameLessonStudent, linkLessonStudent, dayLessonStudent, monthLessonStudent, yearLessonStudent from lessonsStudent natural join students where nameStudent = $1 order by yearLessonStudent, monthLessonStudent, dayLessonStudent, nolessonstudent", [req.params.student], (error, results) => {
        if (error) {
            res.status(400).json({error: error});
            return;
        }
        if (results.rows.length === 0) {
            res.status(400).json({message: "No lessons found"});
            return;
        }
        let output = [];
        results.rows.forEach(row => {
                //
                let studentExist = isInKey(output, 'name', row.namestudent);
                //student doesn't exist
                if (!studentExist.exist) {
                    output.push({
                        name: row.namestudent,
                        months: [{
                            month: row.monthlessonstudent + '/' + row.yearlessonstudent,
                            lessons: [{
                                title: row.namelessonstudent,
                                link: row.linklessonstudent,
                                day: row.daylessonstudent
                            }]
                        }]
                    });
                } else {
                    //verify if month exist
                    let monthExist = isInKey(output[studentExist.index].months, 'month', row.monthlessonstudent + '/' + row.yearlessonstudent);
                    if (!monthExist.exist) {
                        output[studentExist.index].months.push({
                            month: row.monthlessonstudent + '/' + row.yearlessonstudent,
                            lessons: [{
                                title: row.namelessonstudent,
                                link: row.linklessonstudent,
                                day: row.daylessonstudent
                            }]
                        });
                    } else {
                        output[studentExist.index].months[monthExist.index].lessons.push({
                            title: row.namelessonstudent,
                            link: row.linklessonstudent,
                            day: row.daylessonstudent
                        });
                    }
                }
            }
        )
        ;
        res.status(200).json(output);
    });
}

exports.getAllStudentLessons = (req, res) => {
    if (cache.get('lessons')) {
        res.status(200).json(cache.get('lessons'));
        return;
    }

    pool.query("select nameStudent, nameLessonStudent, linkLessonStudent, dayLessonStudent, monthLessonStudent, yearLessonStudent from lessonsStudent natural join students order by yearLessonStudent, monthLessonStudent, dayLessonStudent", (error, results) => {
            if (error) {
                res.status(400).json({error: error});
                return;
            }
            if (results.rows.length === 0) {
                res.status(400).json({message: "No lessons found"});
                return;
            }
            let output = [];
            results.rows.forEach(row => {
                    //
                    let studentExist = isInKey(output, 'name', row.namestudent);
                    //student doesn't exist
                    if (!studentExist.exist) {
                        output.push({
                            name: row.namestudent,
                            months: [{
                                month: row.monthlessonstudent + '/' + row.yearlessonstudent,
                                lessons: [{
                                    title: row.namelessonstudent,
                                    link: row.linklessonstudent,
                                    day: row.daylessonstudent
                                }]
                            }]
                        });
                    } else {
                        //verify if month exist
                        let monthExist = isInKey(output[studentExist.index].months, 'month', row.monthlessonstudent + '/' + row.yearlessonstudent);
                        if (!monthExist.exist) {
                            output[studentExist.index].months.push({
                                month: row.monthlessonstudent + '/' + row.yearlessonstudent,
                                lessons: [{
                                    title: row.namelessonstudent,
                                    link: row.linklessonstudent,
                                    day: row.daylessonstudent
                                }]
                            });
                        } else {
                            output[studentExist.index].months[monthExist.index].lessons.push({
                                title: row.namelessonstudent,
                                link: row.linklessonstudent,
                                day: row.daylessonstudent
                            });
                        }
                    }
                }
            )
            ;
            res.status(200).json(output);
        }
    )
    ;
}

exports.getStudentLessonsUtils = (req, res) => {
    if (cache.get('utils')) {
        res.status(200).json(cache.get('utils'));
        return;
    }
    pool.query("select nameUtilStudent, linkUtilStudent from utilsstudent", (error, results) => {
            if (error) {
                res.status(400).json({error: error});
                return;
            }
            if (results.rows.length === 0) {
                res.status(400).json({message: "No utils found"});
                return;
            }
            let output = [];
            results.rows.forEach(row => {
                    output.push({name: row.nameutilstudent, link: row.linkutilstudent});
                }
            );
            res.status(200).json(output);
        }
    )
}


