const getStudent = require("./get-student");
const getAllStudents = require("./get-all-students");
const createStudent = require("./create-student");
const updateStudent = require("./update-student");
const deleteStudent = require("./delete-student");

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