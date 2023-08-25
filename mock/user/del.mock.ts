import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

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
    Database.delUser(id)
    res.end(send(200, 'success'))
  },
})
