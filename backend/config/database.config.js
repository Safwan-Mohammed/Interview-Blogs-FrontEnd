const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://mohdanfal17:8876@cluster0.jwbhg.mongodb.net/')
        console.log("Database Connection Esatblished ");
        
    }catch(error){
        console.log("Index file DB error ", error);
        
    }
}

module.exports = connectDB