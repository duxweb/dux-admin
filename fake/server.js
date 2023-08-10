const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  // 从 query 参数中获取 page 和 pageSize
  const page = parseInt(req.query.page, 10) || 1
  const pageSize = parseInt(req.query.pageSize, 10) || 10

  // 计算 _start 和 _end 参数
  req.query._start = (page - 1) * pageSize
  req.query._end = page * pageSize

  // 自动设置 _limit 参数
  req.query._limit = pageSize

  next()
})

server.post('/login', (req, res, next) => {
  const data = req.body

  if (!data || data.username !== 'admin' || data.password !== 'admin') {
    res.status(500).json({
      code: 500,
      message: '用户名或密码错误',
    })
    return
  }

  const result = {
    userInfo: {
      username: 'admin',
      nickname: 'dux',
      avatar: '',
    },
    token: 'admin',
    permission: [],
  }

  res.json(result)
})

router.render = (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: res.locals.data,
  })
}

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
