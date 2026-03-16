const mongoose = require('mongoose')
const connection = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/speedUp")
        console.log(mongoose.connection.readyState);
        console.log("Connection Success");
    } catch (error) {
        console.log("Connection Failed");
        console.log(error);
    }
}
connection()
module.exports = connection