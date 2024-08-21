const express = require('express');
const router = express.Router();
const {
    updateUser,
    deleteUser,
    getUser,
    savePost,
    getSavedPosts
} = require('../controllers/user.controller'); 

const verifyToken = require('../middlewares/verifyToken');

// Update user
router.put('/:id', verifyToken, updateUser);

// Delete user
router.delete('/:id', verifyToken, deleteUser); 

// Get user
router.get('/:id', getUser);

// Save/Unsave post
router.put("/:postId/save", verifyToken, savePost); // Ensure the param matches

// Get saved posts
router.get("/:id/saved", verifyToken, getSavedPosts);

module.exports = router;
