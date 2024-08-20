const Comment = require('../models/comments.model');
const AppError = require('../utils/error.util');

// Create a new comment
exports.createComment = async (req, res, next) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(new AppError('Failed to create comment', 500));
    }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        next(new AppError('Failed to update comment', 500));
    }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted!");
    } catch (err) {
        next(new AppError('Failed to delete comment', 500));
    }
};

// Get all comments for a specific post
exports.getCommentsByPostId = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (err) {
        next(new AppError('Failed to retrieve comments', 500));
    }
};
