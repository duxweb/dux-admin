import { defineAPIMock, send, validate } from '../util'
import { categories } from '../data'

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

    data.id = categories.length + 1
    categories.push(data)

    res.end(send(200, 'success'))
  },
})
