const express = require("express");
const router = express.Router();

const schoolCtrl = require("../controllers/schoolsPostgres");

router
    .get("/", schoolCtrl.getSchool)
    .get("/subjects/all", schoolCtrl.getAllSchool)
    .get("/:title", schoolCtrl.getSchool)

module.exports = router;
