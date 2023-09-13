/** 
 * 对form表单传递过来的参数验证处理
 */
const joi = require('joi')
// 1. 导入 @escook/express-joi
const username = joi.string().pattern(/^[\S]{1,6}$/).required()
const password = joi.string().pattern(/^[\S]{6,15}$/).required()
exports.userCheck = {
  body: {
    username,
    password
  }
}