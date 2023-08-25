import { defineAPIMock, send, validate } from '../util'
import MockData, { Setting } from '../data'
const Database = MockData.getInstance()

export default defineAPIMock({
  url: '/setting',
  method: 'POST',
  response(req, res) {
    const { body } = req
    const result = validate(body, {
      title: 'title is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    Database.editSetting(body as Setting)
    res.end(send(200, 'success'))
  },
})
