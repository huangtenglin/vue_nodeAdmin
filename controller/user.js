/**
 * 注册接口逻辑
 */
const bcryptJs = require("bcryptjs")

const db = require("../config/db")
const { jwtSecretKey } = require("../config/jwtSecretKey")
const jwt = require('jsonwebtoken')

exports.registerController = (req, res) => {
  let { username, password } = req.body
  const userSelectSql = "select * from user where name= ?"
  // 注册接口逻辑
  db.query(userSelectSql, username, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
    if (results.length > 0) {
      return res.send({ code: 1, message: '用户已经存在' })
    }
  })
  // 密码加密
  password = bcryptJs.hashSync(password, 10)
  // 头像列表
  const imgList = [
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
    'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
  ]
  // 生成随机数
  const num = Math.floor(Math.random() * 10 + 1)
  // 生成随机头像数
  const head_img = imgList[num]
  // 数据库user插入
  const userInsertSql = 'insert into user (name,pwd,head_img) value (?,?,?)'
  db.query(userInsertSql, [username, password, head_img], (err, results) => {
    //sql语句成功与否
    if (err) res.send({ code: 1, message: err.message })
    //影响行数是否为1
    console.log(results)
    if (results.affectedRows !== 1) {
      return res.send({ code: 1, message: '注册失败' })
    }
    //注册成功
    res.send({ code: 0, message: '注册成功' })
  }
  )

}

/** 
 * 用户登录模块处理
 */
exports.loginContoller = (req, res) => {
  const { username, password } = req.body
  const userSelectSql = "select * from user where name = ?"
  db.query(userSelectSql, username, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message })
    }
    if (results.length == 0) {
      return res.send({ code: 1, message: '用户不存在' })
    }
    // 判断用户密码是否正确
    const compareState = bcryptJs.compareSync(password, results[0].pwd)
    if (!compareState) {
      return res.send({ code: 1, message: "用户密码不正确" })
    }
    // 其中user为token配置的数据,pwd设置为空的字符串是不能被人知道的
    const user = { ...results[0], pwd: '' }
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '24h' })
    res.send({ code: 0, message: "登录成功", token: "Bearer " + token })
  })
}
