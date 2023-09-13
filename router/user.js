const express = require("express")
const user = express.Router()
const userController = require("../controller/user")
// 用户注册
user.post('/register', userController.registerController)

// 用户登录
user.post('/login', userController.loginContoller)

module.exports = user