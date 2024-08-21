const Comment = require('../models/comment.model');
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
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return next(new AppError('Comment not found', 404));
        }
        
        // If the comment has replies, handle them
        if (comment.replies.length > 0) {
            // Remove replies from parent comment's replies array
            await Comment.updateMany(
                { 'replies._id': { $in: comment.replies.map(reply => reply._id) } },
                { $pull: { replies: { _id: { $in: comment.replies.map(reply => reply._id) } } } }
            );
        }
        
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

// Reply to a comment
exports.replyToComment = async (req, res, next) => {
    try {
        const { comment, author, postId } = req.body;
        const parentId = req.params.id;  // Get parent comment ID from route parameters

        // Find the parent comment
        const parentComment = await Comment.findById(parentId);
        if (!parentComment) {
            return next(new AppError('Parent comment not found', 404));
        }

        // Create a new reply
        const newReply = {
            comment,
            author,
            userId: req.userId
        };

        // Add the reply to the parent comment's replies array
        parentComment.replies.push(newReply);
        const updatedComment = await parentComment.save();

        res.status(200).json(updatedComment);
    } catch (err) {
        next(new AppError('Failed to reply to comment', 500));
    }
};
