const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "email": String,
    "name": String,
    "username": String,
    "password": String,
})

module.exports = mongoose.model("user", userSchema)