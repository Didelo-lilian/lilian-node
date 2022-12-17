const express = require("express");
const router = express.Router();

const studentCtrl = require("../controllers/studentPostgres");
const auth = require("../middleware/auth");

router
    .post("/", auth, studentCtrl.createStudent)
    .get("/:name", studentCtrl.getStudents)
    .get("/name/all", studentCtrl.getAllStudentsName)
    .delete("/", auth, studentCtrl.deleteStudent)
    .put("/", auth, studentCtrl.updateStudent);

module.exports = router;
