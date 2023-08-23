import { defineAPIMock, send } from '../util'
import { users } from '../data'

export default defineAPIMock({
  url: '/user/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    if (id == 1) {
      req.statusCode = 500
      res.end(send(500, 'user 1 can not be deleted'))
      return
    }
    const index = users.findIndex((a) => a.id === id)
    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    users.splice(index, 1)
    res.end(send(200, 'success'))
  },
})
