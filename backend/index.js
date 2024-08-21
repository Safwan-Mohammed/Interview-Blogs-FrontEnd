const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./database.config');  // Import the database connection
const upload = require('./multer.config');  // Import multer config
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const commentRoute = require('./routes/comment.route');



app.use(cors())
const corsOptions = {
    origin:'*',
    credential:true,
}

app.use(cors(corsOptions))

dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))


const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    connectDB()
    console.log("App is running on ${PORT}");
    
})