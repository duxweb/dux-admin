import { defineAPIMock, send, validate } from '../util'
import { users } from '../data'
import { faker } from '@faker-js/faker'

export default defineAPIMock({
  url: '/user/:id',
  method: 'POST',
  response(req, res) {
    const data = req.body
    const result = validate(data, {
      username: 'username is empty',
      nickname: 'username is empty',
      password: 'password is empty',
      role_id: 'Role is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    data.id = users.length + 1
    data.avatar = faker.image.url()
    users.push(data)
    res.end(send(200, 'success'))
  },
})
