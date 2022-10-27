const NodeCache = require("node-cache");
const cache = new NodeCache();

const pool = require("./queries");


const getAllStudentsNames = () => {
    const query = "Select nameStudent from students where noStudent in (select distinct noStudent from lessonsStudent)";
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
                    response.push(row["namestudent"]);
                }
            );
            response.sort();
            cache.set("studentsName", response);
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

const updateTime = 5000; // 5 seconds
const languages = ["English", "French", "Spanish"]; // languages to cache

setInterval(() => { // Update cache every 5 seconds
    getAllStudentsNames();
    languages.forEach(language => {
            getHomeParagraphsByLanguage(language);
        }
    );
    getAllLevelSchool();
}, updateTime);

module.exports = cache;

