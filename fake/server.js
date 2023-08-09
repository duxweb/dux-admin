const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

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
