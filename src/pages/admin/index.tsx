import { appConfig, appContext, createApp } from '@duxweb/dux-refine'

import { adminRouter } from './config/router'
import { adminResources } from './config/resources'
import zhLang from './locales/zh/common.json'
import enLang from './locales/en/common.json'

const init = (context: appContext) => {
  context.createApp('admin', createApp())
  context.addI18n('zh', 'common', zhLang)
  context.addI18n('en', 'common', enLang)
  return null
}

const register = (context: appContext) => {
  const admin = context.getApp('admin')
  adminRouter(admin)
  adminResources(admin)
}

const config: appConfig = {
  init: init,
  register: register,
}

export default config
