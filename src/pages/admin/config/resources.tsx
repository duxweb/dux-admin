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
      name: 'articles-manage',
      meta: {
        parent: 'content',
        label: 'articles-manage',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'article',
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
      name: 'category',
      list: 'category',
      create: 'category/create',
      edit: 'category/edit/:id',
      show: 'category/show/:id',
      meta: {
        label: 'categorys',
        parent: 'articles-manage',
      },
    },
  ])
}
