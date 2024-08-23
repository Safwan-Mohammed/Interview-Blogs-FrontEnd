const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connection Esatblished ");
        
    }catch(error){
        console.log("Index file DB error ", error);
        
    }
}

module.exports = connectDB