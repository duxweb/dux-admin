import { defineAPIMock, send, validate } from '../util'
import { roles } from '../data'

export default defineAPIMock({
  url: '/role/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)

    const data = req.body
    const result = validate(data, {
      name: 'Role name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    const index = roles.findIndex((a) => a.id === id)
    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    roles[index] = { ...roles[index], ...data }
    res.end(send(200, 'success'))
  },
})
