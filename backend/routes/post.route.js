const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getPosts,
    getUserPosts,
    likePost
} = require('../controllers/post.controller');

// CREATE
router.post("/create", verifyToken, createPost);

// UPDATE
router.put("/:id", verifyToken, updatePost);

// DELETE
router.delete("/:id", verifyToken, deletePost);

// GET POST DETAILS
router.get("/:id", getPostById);

// GET POSTS
router.get("/", getPosts);

// GET USER POSTS
router.get("/user/:userId", getUserPosts);

router.put("/:id/like", verifyToken, likePost);

module.exports = router;
