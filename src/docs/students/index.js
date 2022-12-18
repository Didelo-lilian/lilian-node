const getStudent = require("./getStudent");
const getAllStudents = require("./getAllStudents");
const createStudent = require("./createStudent");
const updateStudent = require("./updateStudent");
const deleteStudent = require("./deleteStudent");

module.exports = {
    paths: {
        "/student/{name}": {
            ...getStudent,
        },
        "/student/name/all": {
            ...getAllStudents,
        },
        "/student": {
            ...createStudent,
            ...updateStudent,
            ...deleteStudent,
        }
    }
}