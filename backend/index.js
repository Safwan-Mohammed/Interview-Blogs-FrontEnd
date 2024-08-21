const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database.config');  // Import the database connection
const multer = require('multer');  // Import multer
const { storage } = require('./config/multer.config');  // Import storage config from multer.config
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const commentRoute = require('./routes/comment.route');

// Load environment variables
dotenv.config();

// Middleware
const corsOptions = {
    origin: 'https://interview-blogs-api.vercel.app', // Your frontend origin
    credentials: true,               // Allow credentials
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Multer setup
const upload = multer({ storage }); // Use the imported storage
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded successfully!");
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB(); // Ensure the database is connected
    console.log(`App is running on port ${PORT}`);
});
