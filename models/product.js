const mongoose = require('mongoose')
const products = new mongoose.Schema({
    
    product_name: String,
    price: String,
    amount: Number,
    img: String,
    detail: Object
})

module.exports = mongoose.model("products",products)