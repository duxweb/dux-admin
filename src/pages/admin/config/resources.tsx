import { App } from '@/core/helper'
import { useGo } from '@refinedev/core'
import { Button } from 'tdesign-react/esm'

export const adminResources = (app: App) => {
  app.addResources([
    {
      name: 'index',
      list: 'index',
      meta: {
        label: 'Dashboard',
        icon: 'i-tabler:home',
      },
    },
    {
      name: 'content-top',
      meta: {
        label: 'Content',
        icon: 'i-tabler:basket',
      },
    },
    {
      name: 'setting',
      list: 'setting',
      meta: {
        parent: 'content-top',
        label: 'Setting',
        icon: 'i-tabler:book',
      },
    },
    {
      name: 'article-parent',
      meta: {
        parent: 'content-top',
        label: 'Article',
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
        label: 'Article',
        parent: 'article-parent',
      },
    },
  ])
}
