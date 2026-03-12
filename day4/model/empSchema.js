const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    "empName": String,
    "empEmail": {
        type: String,
        unique: true,
        require: true
    },
    "empRole": String,
    "isEligible": Boolean,
    "createdAt": {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model("emp", empSchema)