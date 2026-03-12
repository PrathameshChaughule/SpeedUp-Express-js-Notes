const mongoose = require('mongoose')
const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/sampleDB")
        console.log("DB Connection Successfully")
        console.log(mongoose.connection.readyState);
    } catch (error) {
        console.log("Db Connection Failed", error)
        console.log(mongoose.connection.readyState);
    }
}

connection()

module.exports = connection