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
        icon: 'i-tabler:basket',
      },
    },
    {
      name: 'setting',
      list: 'setting',
      meta: {
        parent: 'content',
        label: 'setting',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'articles-manage',
      meta: {
        parent: 'content',
        label: 'articles-manage',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'articles',
      list: 'article',
      create: 'article/create',
      edit: 'article/edit/:id',
      show: 'article/show/:id',
      meta: {
        label: 'articles',
        parent: 'articles-manage',
      },
    },
    {
      name: 'common',
      meta: {
        label: 'common',
        icon: 'i-tabler:basket',
      },
    },
  ])
}
