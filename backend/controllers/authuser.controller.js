const AppError  = require('../utils/error.util')

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const register = async(req, res, next) => {
    
    try {
        const {username, email ,password} = req.body;
    
        if(!username || !email || !password){
            return next(new AppError('Enter all details',400))
        }
        
        const userExists = await User.findOne({email})

        if(userExists) {
            return next(new AppError("Email already exists" ,400))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password ,salt)

        const newUser = new User({username, email ,password: hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser) 
    } catch (error) {
        return next(new AppError("User registration failed",500))
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email})

        if(!user){
            return next(new AppError('User not found', 404)) 
        }

        const match=await bcrypt.compare(req.body.password,user.password)

        if(!match){
            return next(new AppError("Wrong credentials!", 401))
        }

        const token = jwt.sign({_id : user._id, username:user.username, email:user.email}, process.env.SECRET , {expiresIn:"3d"})
        const {password, ...info} = user._doc
        res.cookie("token" , token , {
            httponly : true,
            secure: true, //https
            sameSite: 'None', 
        }).status(200).json(info)

    }catch(error){
        res.status(500).json(error)
    }
}

const logout = async(req, res,next) => {
    try {
        res.clearCookie("token", {sameSite: "none" , secure:true}).status(200).send("User logged out successfully!")
    }catch(err){
        res.status(500).json(err)
    }
}

//used to check if user login still valid i.e incase user returns  after a while
const refetch = (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Authentication token not found"});
    }

    jwt.verify(token, process.env.SECRET, {} , async (err, decoded) => {
        if(err){
            return res.status(401).json({message:'Invalid or expired token'})
        }
        res.status(200).json(decoded)
    })
}



module.exports = {register , login ,logout ,refetch}