const express = require('express')
const router = express.Router()

const { updateUser, deleteUser, getUser ,savePost,getSavedPosts} = require("../controllers/user.controller");
const verifyToken = require('../middlewares/verifyToken')

router.put('/:id' ,verifyToken ,updateUser)
router.put('/:id' ,verifyToken , deleteUser)
router.put('/:id' ,getUser)

// SAVE A POST
router.put("/:id/save", verifyToken, savePost);

// GET SAVED POSTS
router.get("/saved", verifyToken, getSavedPosts);

module.exports = router;