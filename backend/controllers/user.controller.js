const AppError =  require('../utils/error.util');

const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')

const bcrypt = require('bcrypt')

//update user
const updateUser = async(req, res, next)=>{
    try {
        //if password updated
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password , salt)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )

        if (!updatedUser) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json(updatedUser);

    } catch(err){
        return next(new AppError('Failed to update user', 500));
    }
}

const deleteUser = async (req,res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return next(new AppError('User not found', 404));
        }

        await Post.deleteMany({userId : req.params.id})
        await Comment.deleteMany({userId : req.params.id})

        res.status(200).json("User has been deleted!");

    }catch(err){
        return next(new AppError('Failed to delete user', 500));
    }
}

const getUser = async (req,res,next)=> {
    try {
        const user = await User.findById(req.params.id)

        if(!user){
            return next(new AppError('User not found', 404));

        }
        const {password, ...info} = user._doc;
        res.status(200).json(info);

    } catch (error) {
        return next(new AppError('Failed to retrieve user', 500));
    }
}

// Save a post
const savePost = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user.savedPosts.includes(req.params.id)) {
            await user.updateOne({ $push: { savedPosts: req.params.id } });
            res.status(200).json("Post has been saved");
        } else {
            await user.updateOne({ $pull: { savedPosts: req.params.id } });
            res.status(200).json("Post has been removed from saved");
        }
    } catch (err) {
        next(new AppError('Failed to save/unsave post', 500));
    }
};




module.exports = {updateUser , deleteUser ,getUser , savePost}