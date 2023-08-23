import { defineAPIMock, send } from '../util'
import { articles } from '../data'

export default defineAPIMock({
  url: '/article/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    const index = articles.findIndex((a) => a.id === id)
    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    articles.splice(index, 1)
    res.end(send(200, 'success'))
  },
})
