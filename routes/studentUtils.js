const express = require("express");
const router = express.Router();

const studentUtilsCtrl = require("../controllers/studentUtils");
// const auth = require("../middleware/auth");

router
  .post("/", studentUtilsCtrl.createStudentUtils)
  .get("/", studentUtilsCtrl.getStudentUtils)
  .delete("/", studentUtilsCtrl.deleteStudentUtils)
  .put("/", studentUtilsCtrl.updateStudentUtils)
  ;

module.exports = router;
