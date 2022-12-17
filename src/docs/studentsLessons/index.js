const getStudentLessons = require("./getStudentLessons");
const getStudentUtils = require("./getStudentUtils");
const getAllStudentLessons = require("./getAllStudentLessons");

module.exports = {
    paths: {
        "/studentLesson/student/{name}": {
            ...getStudentLessons,
        },
        "/studentLesson": {
            ...getAllStudentLessons,
        },
        "/studentLesson/utils": {
            ...getStudentUtils,
        }
    }
}