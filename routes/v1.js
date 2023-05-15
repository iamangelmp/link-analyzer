var express = require("express");
var router = express.Router();
const linksReader = require("../controllers/linksReader.controller.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/readLinks", linksReader);

module.exports = router;
