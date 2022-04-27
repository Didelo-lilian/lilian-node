const express = require("express");
const router = express.Router();

const homeCtrl = require("../controllers/home");
const auth = require("../middleware/auth");

router
  .post("/", auth, homeCtrl.createHome)
  .get("/", homeCtrl.getHome)
  .delete("/", auth, homeCtrl.deleteHome)
  .put("/", auth, homeCtrl.updateHome)
  ;

module.exports = router;
