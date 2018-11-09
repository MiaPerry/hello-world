'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//武汉
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   WD_URL:      '"http://172.16.1.137:14081/gateway"',
//   UPLOAD:      '"http://172.16.1.137:14081/zuul/gateway"',
//   accessToken: '"http://172.16.1.137:14081/token/access"',
//   WD_VERSSION:  '""'
// })

//测试服务器
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WD_URL:       '"http://172.168.80.149:14081/gateway"',
  UPLOAD:       '"http://172.168.80.149:14081/zuul/gateway"',
  accessToken:  '"http://172.168.80.149:14081/token/access"',
  WD_VERSSION:  '""'
})
//本机
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   WD_URL:       '"http://10.10.20.94:14081/gateway"',
//   UPLOAD:       '"http://10.10.20.94:14081/zuul/gateway"',
//   accessToken:  '"http://10.10.20.94:14081/token/access"',
// })
