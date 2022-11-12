var express = require("express");
var router = express.Router();
var userModel = require(`../models/user`);
const { default: mongoose } = require("mongoose");
/* GET users listing. */

//----CREATE---//

router.post("/", async function (req, res, next) {
  try {
    let body = req.body;
    var new_user = new userModel({
      username: body.username,
      password: body.password,
      fname: body.fname,
      lname: body.lname,
      age: body.age,
      gender: body.gender,
    });
    var user = await new_user.save();
    return res.status(201).send({
      data: user,
      message: "create success",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//----GET ALL---//

router.get("/", async function (req, res) {
  try {
    let user = await userModel.find();
    return res.send({
      data: user,
      message: "get success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//----GET BY ID---//

router.get("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    // let obj_id = mongoose.Types.ObjectId(id)
    // let user = await userModel.find({_id: obj_id})
    let user = await userModel.findById(id);
    return res.send({
      data: user,
      message: "get by id success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//---- UPDATE ---//
router.put("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let body = req.body;
    await userModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          username: body.username,
          password: body.password,
          fname: body.fname,
          lname: body.lname,
          age: body.age,
          gender: body.gender,
        },
      }
    );
    let user = await userModel.findById(id);
    return res.send({
      data: user,
      message: "update success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//---- DELETE ---//

router.delete("/:id", async function (req, res) {
  try {
    let id = req.params.id;

    await userModel.deleteOne({
      _id: mongoose.Types.ObjectId(id),
    });
    let user = await userModel.find();
    return res.send({
      data: user,
      message: "delete success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
