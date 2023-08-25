import { defineAPIMock, send, validate } from '../util'
import MockData, { Article } from '../data'
const Database = MockData.getInstance()

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

    Database.createArticle(data as Article)

    res.end(send(200, 'success'))
  },
})
