const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const AppError = require('../utils/error.util');

// Create a new post
exports.createPost = async (req, res, next) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        next(new AppError('Failed to create post', 500));
    }
};

// Update a post
exports.updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        next(new AppError('Failed to update post', 500));
    }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        next(new AppError('Failed to delete post', 500));
    }
};

// Get post details
exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        next(new AppError('Failed to retrieve post', 500));
    }
};

// Get all posts or search posts
exports.getPosts = async (req, res, next) => {
    const query = req.query;
    try {
        const searchFilter = {
            title: { $regex: query.search, $options: "i" }
        };
        const posts = await Post.find(query.search ? searchFilter : null);
        res.status(200).json(posts);
    } catch (err) {
        next(new AppError('Failed to retrieve posts', 500));
    }
};

// Get posts by a specific user
exports.getUserPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (err) {
        next(new AppError('Failed to retrieve user posts', 500));
    }
};

//liking a post
exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.userId)) {
            await post.updateOne({ $push: { likes: req.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.userId } });
            res.status(200).json("Post has been unliked");
        }
    } catch (err) {
        next(new AppError('Failed to like/unlike post', 500));
    }
};