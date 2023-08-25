import { defineAPIMock, send, validate } from '../util'
import MockData, { Role } from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/role',
  method: 'POST',
  response(req, res) {
    const data = req.body
    const result = validate(data, {
      name: 'Role name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    Database.createRole(data as Role)
    res.end(send(200, 'success'))
  },
})
