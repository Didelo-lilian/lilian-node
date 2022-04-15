const express = require("express");
const router = express.Router();

const homeCtrl = require("../controllers/home");
// const auth = require("../middleware/auth");

router
  .post("/", homeCtrl.createHome)
  .get("/", homeCtrl.getHome)
  .delete("/", homeCtrl.deleteHome)
  .put("/", homeCtrl.updateHome)
  ;

module.exports = router;
