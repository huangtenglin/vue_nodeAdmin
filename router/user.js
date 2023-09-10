const express = require("express")
const user = express.Router()
const registerContoller = require("../controller/user")
const loginContoller = require("../controller/user")
// 用户注册
user.post('/register', registerContoller)

// 用户登录
user.post('/login', loginContoller)

module.exports = user