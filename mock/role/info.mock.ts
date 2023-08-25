import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/role/:id',
  method: 'GET',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = Database.oneRole(id)
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
