const express = require("express");
const router = express.Router();

const studentCtrl = require("../controllers/student");
const auth = require("../middleware/auth");

router
    .post("/", auth, studentCtrl.createStudent)
    .get("/", studentCtrl.getStudents)
    .get("/:name", studentCtrl.getStudent)
    .delete("/", auth, studentCtrl.deleteStudent)
    .put("/", auth, studentCtrl.updateStudent)
    .put("/class", auth, studentCtrl.updateStudentClass)
    .delete("/lesson", auth, studentCtrl.deleteLastLesson);
;

module.exports = router;
