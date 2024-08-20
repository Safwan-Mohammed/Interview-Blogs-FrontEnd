const express = require("express");
const router = express.Router();

//importing controllers
const { register, login, logout ,refetch } = require("../controllers/user.controller");

//Register
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get('/refetch',refetch)

module.exports = router;
