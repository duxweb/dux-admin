import { defineAPIMock, send, validate } from '../util'
import MockData, { User } from '../data'
import { faker } from '@faker-js/faker'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/user',
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
    Database.createUser({ ...data, avatar: data?.avatar || faker.image.url() } as User)
    res.end(send(200, 'success'))
  },
})
