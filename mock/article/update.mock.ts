import { defineAPIMock, send, validate } from '../util'
import MockData, { Article } from '../data'
const Database = MockData.getInstance()

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
    Database.editArticle({ ...data, id: id } as Article)
    res.end(send(200, 'success'))
  },
})
