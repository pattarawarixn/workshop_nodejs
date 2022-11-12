

const mongoose = require('mongoose')
const orders = new mongoose.Schema({
    
    customer: String, //ชื่อผู้ซื้อ
    purchase: Object, //รายการสินค้าที่ซื้อ
    amount: Number, //จำนวนสินค้าแต่ละชิ้นที่ซื้อ
    total: Number //ราคารวม
})

module.exports = mongoose.model("orders",orders)