/**
 * 注册接口逻辑
 */
const bcryptJs = require("bcryptjs")

const db = require("../config/db")
exports.registerController = (req, res) => {
  let { username, password } = req.body
  console.log(req.body)
  if (!username || !password) {
    return res.send({ code: 1, message: '用户名或者密码不能为空' })
  }
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
  res.send("用户登录成功")
}
