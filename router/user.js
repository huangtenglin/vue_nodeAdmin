const express = require("express")
const expressJoi = require('@escook/express-joi')
const { userCheck } = require("../utils/check")
const user = express.Router()
const userController = require("../controller/user")
// 用户注册
user.post('/register', expressJoi(userCheck), userController.registerController)
// 用户登录
user.post('/login', expressJoi(userCheck), userController.loginContoller)
// 用户查询
user.get('/userinfo', userController.userInfoController)
module.exports = user