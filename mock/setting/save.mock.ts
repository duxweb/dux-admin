import { defineAPIMock, send, validate } from '../util'
import { setting } from '../data'

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

    setting.title = body.title
    setting.logo = body?.logo || ''
    setting.favicon = body?.favicon || ''
    setting.footer = body?.footer || ''
    setting.theme = body?.theme || 'default'
    setting.layout = body?.layout || 'side'
    setting.fixedHeader = body?.fixedHeader || false
    setting.fixedSideBar = body?.fixedSideBar || false
    setting.fixedTabs = body?.fixedTabs || false

    res.end(send(200, 'success'))
  },
})
