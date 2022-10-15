const express = require("express");
const router = express.Router();

const homePostgresCtrl = require("../controllers/homePostgres");
const auth = require("../middleware/auth");

router
  .get("/", homePostgresCtrl.getHome)
  ;

module.exports = router;
