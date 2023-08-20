import { Config } from '@duxweb/dux-refine'

const config: Config = {
  projectId: '75z1iv-x6xVpm-suPmVP',
  apiUrl: 'http://0.0.0.0:3000',
  apiPath: {
    login: 'login',
    check: 'check',
    register: 'register',
    forgotPassword: 'forgot-password',
    updatePassword: 'update-password',
    upload: 'upload',
  },
  defaultApp: 'admin',
  resourcesPrefix: false,
  moduleApp: {
    admin: {
      register: true,
      forgotPassword: true,
    },
  },
}
export default config
