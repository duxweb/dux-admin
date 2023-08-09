import { AppConfig } from '@/core/config'

const config: AppConfig = {
  projectId: '75z1iv-x6xVpm-suPmVP',
  apiUrl: 'http://share-cloud.test',
  defaultLayout: 'admin',
  basePath: {
    login: 'login',
    check: 'check',
    register: 'register',
    forgotPassword: 'forgot-password',
    updatePassword: 'update-password',
  },
  tabBar: {
    admin: [
      {
        label: 'Dashboard',
        icon: 'i-tabler:home',
        route: 'index',
      },
      {
        label: 'Blog',
        icon: 'i-tabler:basket',
        route: 'blog-posts',
      },
    ],
  },
}
export default config
