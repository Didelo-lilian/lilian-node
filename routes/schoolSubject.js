const express = require("express");
const router = express.Router();

const schoolSubjectCtrl = require("../controllers/schoolSubject");
// const auth = require("../middleware/auth");

router
  .post("/", schoolSubjectCtrl.createSchoolSubject)
  .get("/", schoolSubjectCtrl.getSchoolSubject)
  .delete("/", schoolSubjectCtrl.deleteSchoolSubject)
  .put("/", schoolSubjectCtrl.updateSchoolSubject)
  ;

module.exports = router;