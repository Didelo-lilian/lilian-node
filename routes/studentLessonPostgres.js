const express = require("express");
const router = express.Router();

const studentLessonCtrl = require("../controllers/studentLessonPostgres");

router
    .post("/", studentLessonCtrl.createStudentLesson)
    .get("/", studentLessonCtrl.getAllStudentLessons)
    .get("/student/:student", studentLessonCtrl.getStudentLessons)
    .get("/utils", studentLessonCtrl.getStudentLessonsUtils)
;

module.exports = router;
