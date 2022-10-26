const express = require("express");
const router = express.Router();

const studentCtrl = require("../controllers/studentPostgres");

router
    .post("/", studentCtrl.createStudent)
    .get("/", studentCtrl.getStudents)
    .get("/:name", studentCtrl.getStudents)
    .get("/name/all", studentCtrl.getAllStudentsName)
    .delete("/", studentCtrl.deleteStudent)
    .put("/", studentCtrl.updateStudent);
;

module.exports = router;
