import { AppConfig } from '@/core/config'

const config: AppConfig = {
  projectId: '75z1iv-x6xVpm-suPmVP',
  apiUrl: 'https://api.fake-rest.refine.dev',
  defaultPath: '/admin',
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
