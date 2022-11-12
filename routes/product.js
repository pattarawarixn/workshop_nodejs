var express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
var productModel = require(`../models/product`);
// var mongoose = require('mongoose')

/* GET users listing. */
router.post("/", async function (req, res, next) {
  try {
    let body = req.body;
    var new_product = new productModel({
      product_name: body.product_name,
      price: body.price,
      amount: body.amount,
      img: body.img,
      detail: body.detail,
    });
    var product = await new_product.save();
    return res.status(201).send({
      data: product,
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

router.get("/", async function (req, res) {
  try {
    let product = await productModel.find();
    return res.send({
      data: product,
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

router.get("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    // let obj_id = mongoose.Types.ObjectId(id)
    // let product = await productModel.find({_id: obj_id})
    let product = await productModel.findById(id);
    return res.send({
      data: product,
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



//UPDATE
router.put("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let body = req.body;
    await productModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          product_name: body.product_name,
          price: body.price,
          amount: body.amount,
          img: body.img,
          detail: body.detail,
        },
      }
    );
    let product = await productModel.findById(id);
    return res.send({
      data: product,
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



router.delete("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    
    await productModel.deleteOne(
      {
        _id: mongoose.Types.ObjectId(id),
      }
    );
    let product = await productModel.find();
    return res.send({
      data: product,
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
