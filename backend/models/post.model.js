const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Ensure this matches user reference type
        required: true,
        ref: 'User', // Reference to User model
    },
    categories: {
        type: [String], // Array of strings
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId if likes are user references
        default: [],
        ref: 'User', // Reference to User model
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
