import { defineAPIMock, send, validate } from '../util'
import { articles } from '../data'

export default defineAPIMock({
  url: '/article/:id',
  method: 'POST',
  response(req, res) {
    const data = req.body
    const result = validate(data, {
      title: 'Article title is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    const id = parseInt(req.params.id)
    const index = articles.findIndex((a) => a.id === id)

    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    articles[index] = { ...articles[index], ...data }
    res.end(send(200, 'success'))
  },
})
