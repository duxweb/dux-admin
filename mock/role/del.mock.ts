import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/role/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    Database.delRole(id)
    res.end(send(200, 'success'))
  },
})
