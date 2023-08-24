import { defineAPIMock, send, validate } from '../util'
import { roles } from '../data'

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
    data.id = roles.length + 1
    roles.push(data)
    res.end(send(200, 'success'))
  },
})
