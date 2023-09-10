const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


// 引入bodyparser,对body请求体参数的解析
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
// 跨域配置的处理
app.use(cors())

/**
 * 用户相关接口
 */
const userRouter = require("./router/user")
app.use('/api/v1/user', userRouter)
app.listen(3000, () => {
  console.log('端口启动成功')
})