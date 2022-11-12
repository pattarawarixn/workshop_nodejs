var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    var query = req.query;
    if(query.name==null)throw{code:400,message:"req name"}
    console.log(query);
    res.status(200).send({
      data: query,
      message: "get success",
      success: true,
    });
  } catch (error) {
    res.status(error.code).send({
      message: "ERROR",
      success: false,
    });
  }
});

router.get("/profile/:name/:age", function (req, res, next) {
  var params = req.params;
  console.log(params);
  res.send(params);
});

router.post("/", function (req, res, next) {
  var body = req.body;
  console.log(body);
  res.send(body);
});

router.put("/", function (req, res, next) {
  res.send("hi putting");
});

router.delete("/", function (req, res, next) {
  res.send("hi deleting");
});

module.exports = router;
