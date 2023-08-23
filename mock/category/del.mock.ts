import { defineAPIMock, send } from '../util'
import { categories } from '../data'

export default defineAPIMock({
  url: '/category/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    const index = categories.findIndex((a) => a.id === id)
    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    categories.splice(index, 1)
    res.end(send(200, 'success'))
  },
})
