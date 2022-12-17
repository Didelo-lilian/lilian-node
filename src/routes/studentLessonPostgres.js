const express = require("express");
const router = express.Router();

const studentLessonCtrl = require("../controllers/studentLessonPostgres");
const auth = require("../middleware/auth");

router
    .post("/", auth, studentLessonCtrl.createStudentLesson)
    .get("/", studentLessonCtrl.getAllStudentLessons)
    .get("/student/:student", studentLessonCtrl.getStudentLessons)
    .get("/utils", studentLessonCtrl.getStudentLessonsUtils)
;

module.exports = router;
