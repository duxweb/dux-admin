import { defineAPIMock, send, validate } from '../util'
import MockData, { User } from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/user/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)
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
    const info = Database.oneUser(id)
    if (!data?.password) {
      data.password = info?.password
    }

    Database.editUser({ ...data, id: id } as User)

    res.end(send(200, 'success'))
  },
})
