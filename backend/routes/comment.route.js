const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPostId
} = require('../controllers/comment.controller');

// CREATE
router.post("/create", verifyToken, createComment);

// UPDATE
router.put("/:id", verifyToken, updateComment);

// DELETE
router.delete("/:id", verifyToken, deleteComment);

// GET COMMENTS FOR A POST
router.get("/post/:postId", getCommentsByPostId);

module.exports = router;
