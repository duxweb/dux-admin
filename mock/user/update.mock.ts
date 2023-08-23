import { defineAPIMock, send, validate } from '../util'
import { users } from '../data'

export default defineAPIMock({
  url: '/user/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)
    const index = users.findIndex((a) => a.id === id)

    const data = req.body
    const result = validate(data, {
      username: 'username is empty',
      nickname: 'username is empty',
      role_id: 'Role is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    if (!data?.password) {
      data.password = users[index]?.password
    }

    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    users[index] = { ...users[index], ...data }
    res.end(send(200, 'success'))
  },
})
