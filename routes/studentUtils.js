const express = require("express");
const router = express.Router();

const studentUtilsCtrl = require("../controllers/studentUtils");
const auth = require("../middleware/auth");

router
  .post("/", auth, studentUtilsCtrl.createStudentUtils)
  .get("/", studentUtilsCtrl.getStudentUtils)
  .delete("/", auth, studentUtilsCtrl.deleteStudentUtils)
  .put("/", auth, studentUtilsCtrl.updateStudentUtils)
  ;

module.exports = router;
