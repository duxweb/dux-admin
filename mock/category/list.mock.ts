import { defineAPIMock, send } from '../util'
import { categories } from '../data'
import '../data'

export default defineAPIMock({
  url: '/category',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        list: categories,
      })
    )
  },
})
