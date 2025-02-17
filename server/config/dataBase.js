const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Db connected Successfully.")})
    .catch((err)=>{
        console.log("Failed to connect DataBase.");
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnect;
