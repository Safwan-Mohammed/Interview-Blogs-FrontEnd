const express = require('express')
const router = express.Router()

const { updateUser, deleteUser, getUser} = require("../controllers/user.controller");
const verifyToken = require('../middlewares/verifyToken')

router.put('/:id' ,verifyToken ,updateUser)
router.put('/:id' ,verifyToken , deleteUser)
router.put('/:id' ,getUser)

module.exports = router;