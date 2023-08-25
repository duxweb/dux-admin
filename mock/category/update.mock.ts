import { defineAPIMock, send, validate } from '../util'
import MockData, { Category } from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/category/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = req.body

    const result = validate(data, {
      name: 'Category name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    Database.editCategory({ ...data, id: id } as Category)
    res.end(send(200, 'success'))
  },
})
