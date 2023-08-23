import { defineAPIMock, send } from '../util'
import { categories } from '../data'

export default defineAPIMock({
  url: '/category/:id',
  method: 'GET',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = categories.find((a) => a.id === id)
    if (data) {
      res.end(
        send(200, 'success', {
          info: data,
        })
      )
    } else {
      req.statusCode = 404
      res.end()
    }
  },
})
