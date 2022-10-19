const express = require("express");
const router = express.Router();

const studentCtrl = require("../controllers/studentPostgres");

router
    .post("/", studentCtrl.createStudent)
    .get("/", studentCtrl.getStudents)
    .get("/:name/:level", studentCtrl.getStudents)
    .delete("/", studentCtrl.deleteStudent)
    .put("/", studentCtrl.updateStudent);
;

module.exports = router;
