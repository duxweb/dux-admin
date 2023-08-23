import { defineAPIMock, send } from '../util'
import { articles } from '../data'

export default defineAPIMock({
  url: '/article',
  method: 'GET',
  response(req, res) {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = articles.slice(startIndex, endIndex)
    res.end(
      send(200, 'success', {
        list: data,
        total: articles.length,
        Page: page,
      })
    )
  },
})
