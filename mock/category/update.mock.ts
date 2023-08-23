import { defineAPIMock, send, validate } from '../util'
import { categories } from '../data'

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
    const index = categories.findIndex((a) => a.id === id)

    if (!index) {
      req.statusCode = 404
      res.end()
      return
    }
    categories[index] = { ...categories[index], ...data }
    res.end(send(200, 'success'))
  },
})
