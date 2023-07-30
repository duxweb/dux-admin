import { appConfig, appContext } from '../../core/app'
import { authProvider } from './provider/authProvider'

import { createApp } from '../../core/helper'
import { adminRouter } from './config/router'
import { adminResources } from './config/resources'

const init = (context: appContext) => {
  context.createApp(
    'admin',
    createApp({
      authProvider: authProvider,
    })
  )
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
