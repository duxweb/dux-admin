import { defineAPIMock, send } from '../util'
import { roles } from '../data'

export default defineAPIMock({
  url: '/role/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    const index = roles.findIndex((a) => a.id === id)
    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    roles.splice(index, 1)
    res.end(send(200, 'success'))
  },
})
