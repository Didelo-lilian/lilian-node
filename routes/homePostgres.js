const express = require("express");
const router = express.Router();

const homePostgresCtrl = require("../controllers/homePostgres");
const auth = require("../middleware/auth");

router
  .post("/", homePostgresCtrl.createHome)
  .get("/", homePostgresCtrl.getHome)
  .put("/", homePostgresCtrl.updateHome)
  .delete("/", homePostgresCtrl.deleteHome);
  ;

module.exports = router;
