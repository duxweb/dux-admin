import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/category/:id',
  method: 'GET',
  response(req, res) {
    const id = parseInt(req.params.id)

    const data = Database.oneCategory(id)
    if (data) {
      res.end(
        send(200, 'success', {
          info: data,
        })
      )
    } else {
      res.statusCode = 404
      res.end()
    }
  },
})
