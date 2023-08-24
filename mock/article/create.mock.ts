import { defineAPIMock, send, validate } from '../util'
import { articles } from '../data'

export default defineAPIMock({
  url: '/article',
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

    data.id = articles.length + 1
    data.create_at = new Date().toISOString()
    articles.push(data)

    res.end(send(200, 'success'))
  },
})
