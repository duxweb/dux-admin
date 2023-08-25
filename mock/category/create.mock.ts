import { defineAPIMock, send, validate } from '../util'
import MockData, { Category } from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/category',
  method: 'POST',
  response(req, res) {
    const data = req.body

    const result = validate(data, {
      name: 'Category name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    Database.createCategory(data as Category)

    res.end(send(200, 'success'))
  },
})
