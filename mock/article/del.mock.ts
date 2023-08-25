import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/article/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    Database.delArticle(id)
    res.end(send(200, 'success'))
  },
})
