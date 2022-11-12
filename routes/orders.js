

var express = require('express');
var router = express.Router();
var orderModel = require(`../models/order`);
const { default: mongoose } = require("mongoose");

/* GET orders listing. */

//----CREATE---//

router.post("/", async function (req, res, next) {
  try {
    let body = req.body;
    var new_order = new orderModel({
         
        customer: body.customer, //ชื่อผู้ซื้อ
        purchase: body.purchase, //รายการสินค้าที่ซื้อ
        amount: body.amount, //จำนวนสินค้าแต่ละชิ้นที่ซื้อ
        total: body.total //ราคารวม
    });
    var order = await new_order.save();
    return res.status(201).send({
      data: order,
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
    let order = await orderModel.find();
    return res.send({
      data: order,
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
    // let order = await orderModel.find({_id: obj_id})
    let order = await orderModel.findById(id);
    return res.send({
      data: order,
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
    await orderModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: {
            customer: body.customer, //ชื่อผู้ซื้อ
            purchase: body.purchase, //รายการสินค้าที่ซื้อ
            amount: body.amount, //จำนวนสินค้าแต่ละชิ้นที่ซื้อ
            total: body.total //ราคารวม
        },
      }
    );
    let order = await orderModel.findById(id);
    return res.send({
      data: order,
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
    
    await orderModel.deleteOne(
      {
        _id: mongoose.Types.ObjectId(id),
      }
    );
    let order = await orderModel.find();
    return res.send({
      data: order,
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

