import { App } from '@duxweb/dux-refine'

export const adminResources = (app: App) => {
  app.addResources([
    {
      name: 'index',
      list: 'index',
      meta: {
        label: 'dashboard',
        icon: 'i-tabler:home',
      },
    },
    {
      name: 'content',
      meta: {
        label: 'content',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'article',
      list: 'article',
      create: 'article/create',
      meta: {
        label: 'article',
        parent: 'content',
        icon: 'i-tabler:article',
      },
    },
    {
      name: 'category',
      list: 'category',
      create: 'category/create',
      meta: {
        label: 'category',
        parent: 'content',
        icon: 'i-tabler:category',
      },
    },
    {
      name: 'system',
      meta: {
        label: 'system',
        icon: 'i-tabler:adjustments',
      },
    },
    {
      name: 'user',
      list: 'user',
      create: 'user/create',
      meta: {
        label: 'user',
        parent: 'system',
        icon: 'i-tabler:user',
      },
    },
    {
      name: 'role',
      list: 'role',
      create: 'role/create',
      meta: {
        label: 'role',
        parent: 'system',
        icon: 'i-tabler:users',
      },
    },
    {
      name: 'setting',
      list: 'setting',
      meta: {
        label: 'setting',
        parent: 'system',
        icon: 'i-tabler:settings',
      },
    },
  ])
}
