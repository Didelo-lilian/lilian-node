const express = require("express");
const router = express.Router();

const levelsSchoolCtrl = require("../controllers/levelsSchoolPostgres");

router
    .get("/", levelsSchoolCtrl.getLevelsSchool)
    .get("/level/all", levelsSchoolCtrl.getAllLevelSchool)
    .get("/:title", levelsSchoolCtrl.getLevelsSchool)

module.exports = router;
