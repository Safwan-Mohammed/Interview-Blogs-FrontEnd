// multer.config.js

const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);  // Use the name provided in the request body
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
