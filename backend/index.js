const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer') 

dotenv.config()
app.use(express.json())

app.use(cors())
const corsOptions = {
    origin:'*',
    credential:true,
}

app.use(cors(corsOptions))

app.use('/ping',(req,res)=>{
    res.send("/ Server working")
})

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connection Esatblished ");
        
    }catch(error){
        console.log("Index file DB error ", error);
        
    }
}

app.listen(process.env.PORT , ()=>{
    connectDB()
    console.log("App is running on port"+process.env.PORT);
    
})