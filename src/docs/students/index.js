const getStudent = require("./getStudent");
const getAllStudents = require("./getAllStudents");
const createStudent = require("./createStudent");
const updateStudent = require("./updateStudent");
const deleteStudent = require("./deleteStudent");

module.exports = {
    paths: {
        "/students/{name}": {
            ...getStudent,
        },
        "/students/name/all": {
            ...getAllStudents,
        },
        "/students": {
            ...createStudent,
            ...updateStudent,
            ...deleteStudent,
        }
    }
}