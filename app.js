const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const joi = require('joi')
const app = express()

// 对token的一个解密
const { expressjwt } = require("express-jwt")

const { jwtSecretKey } = require("./config/jwtSecretKey")


// 引入bodyparser,对body请求体参数的解析
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
// 跨域配置的处理
app.use(cors())

/**
 * 用户相关接口
 */
const userRouter = require("./router/user")

// 对token的一个解析
// 其中unless是对哪些路径的一个排除
app.use(expressjwt({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({ path: ['/api/v1/user/login', '/api/v1/user/register'] }))
// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }
  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message
  })
})
app.use('/api/v1/user', userRouter)
app.listen(3000, () => {
  console.log('端口启动成功')
})