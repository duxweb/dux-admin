import { defineAPIMock, send } from '../util'
import MockData from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/setting',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        info: Database.oneSetting(),
      })
    )
  },
})
