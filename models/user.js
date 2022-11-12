
const mongoose = require('mongoose')
const users = new mongoose.Schema({
    
    username: String,
    password: String,
    fname: String,
    lname: String,
    age: Number,
    gender: String

})

module.exports = mongoose.model("users",users)