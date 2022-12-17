const express = require("express");
const router = express.Router();

const homePostgresCtrl = require("../controllers/homePostgres");
const auth = require("../middleware/auth");

router
    .post("/", auth, homePostgresCtrl.createHome)
    .get("/:language", homePostgresCtrl.getHome)
    .put("/", auth, homePostgresCtrl.updateHome)
    .delete("/", auth, homePostgresCtrl.deleteHome);

module.exports = router;