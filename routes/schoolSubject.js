const express = require("express");
const router = express.Router();

const schoolSubjectCtrl = require("../controllers/schoolSubject");
const auth = require("../middleware/auth");

router
  .post("/", auth, schoolSubjectCtrl.createSchoolSubject)
  .get("/:title", schoolSubjectCtrl.getSchoolSubject)
  .delete("/", auth, schoolSubjectCtrl.deleteSchoolSubject)
  .put("/", auth, schoolSubjectCtrl.updateSchoolSubject)
  ;

module.exports = router;