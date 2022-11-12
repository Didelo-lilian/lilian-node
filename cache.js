const NodeCache = require("node-cache");
const cache = new NodeCache();

const pool = require("./queries");


const getAllStudentsInfoMin = () => {
    const query = "Select nameStudent, nameLevelStudent from students natural join levelsStudent where noStudent in (select distinct noStudent from lessonsStudent) order by nameStudent";
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            return;
        }
        if (result.rows === undefined) {
            return;
        }
        if (result.rows.length > 0) {
            let response = [];
            result.rows.forEach(row => {
                    response.push({name: row["namestudent"], level: row["namelevelstudent"]});
                }
            );
            response.sort();
            cache.set("students", response);
        }
    });
}

const getHomeParagraphsByLanguage = (language) => {
    pool.query('Select * from languages where language = $1', [language], (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (results === undefined) {
                return;
            }
            if (results.rows === undefined) {
                return;
            }
            if (results.rows.length === 0) {
                return;
            }
            const noLanguage = results.rows[0]["nolanguage"];
            if (noLanguage === undefined) {
                return;
            }

            const query = 'Select textHomeParagraph from homeParagraphs where noLanguage = $1 order by orderHomeParagraph';
            pool.query(query, [noLanguage], (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results === undefined) {
                        return;
                    }
                    if (results.rows === undefined) {
                        return;
                    }
                    if (results.rows.length > 0) {
                        let output = [];
                        results.rows.forEach(row => {
                            if (output.length == 0 || output[output.length - 1].noLanguage != noLanguage) {
                                output.push({noLanguage: noLanguage, paragraphs: [row.texthomeparagraph]});
                            } else {
                                output[output.length - 1].paragraphs.push(row.texthomeparagraph);
                            }
                        });
                        cache.set('home' + language, output);
                    }
                }
            )
        }
    );

}

const getAllLevelSchool = () => {
    pool.query("select nameLevelSchool || '/\' || nameSchool as schoolRoad from schools natural join levelsSchool order by nameLevelSchool desc , nameSchool", (error, results) => {
            if (error) {
                return;
            }
            if (results === undefined) {
                return;
            }
            if (results.rows === undefined) {
                return;
            }
            if (results.rows.length === 0) {
                return;
            }

            let output = [];
            results.rows.forEach(row => {
                    output.push(row.schoolroad);
                }
            );
            cache.set("schools", output);
        }
    )
    ;
}

const getUtils = (req, res) => {
    pool.query("select nameUtilStudent, linkUtilStudent from utilsstudent", (error, results) => {
            if (error) {
                return;
            }
            if (results.rows.length === 0) {
                return;
            }
            let output = [];
            results.rows.forEach(row => {
                    output.push({name: row.nameutilstudent, link: row.linkutilstudent});
                }
            );
            cache.set("utils", output);
        }
    )
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

const getAllStudents = () => {
    pool.query("select nameStudent, nameLessonStudent, linkLessonStudent, dayLessonStudent, monthLessonStudent, yearLessonStudent from lessonsStudent natural join students order by yearLessonStudent, monthLessonStudent, dayLessonStudent, nolessonstudent", (error, results) => {
            if (error) {
                return;
            }
            if (results.rows.length === 0) {
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
//END OF FOR EACH
            )
            ;
            cache.set("lessons", output);
        }
    )
    ;
}

const updateTime = 60; // 1 min
const languages = ["English", "French", "Spanish"]; // languages to cache

const init = () => {
    getAllStudentsInfoMin();
    languages.forEach(language => {
            getHomeParagraphsByLanguage(language);
        }
    );
    getAllLevelSchool();
    getUtils();
    getAllStudents();
}

const update = () => {
    init();
    setTimeout(update, updateTime * 1000);
}

update();

module.exports = cache;

