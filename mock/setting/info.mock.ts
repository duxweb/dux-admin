import { defineAPIMock, send } from '../util'
import { setting } from '../data'

export default defineAPIMock({
  url: '/setting',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        info: setting,
      })
    )
  },
})
