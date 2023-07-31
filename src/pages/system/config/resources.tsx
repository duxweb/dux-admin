import { App } from '@/core/helper'

export const adminResources = (app: App) => {
  app.addResources([
    {
      name: 'index',
      list: 'index',
      meta: {
        label: 'Dashboard',
      },
    },
    {
      name: 'blog_posts',
      list: 'blog-posts',
      create: 'blog-posts/create',
      edit: 'blog-posts/edit/:id',
      show: 'blog-posts/show/:id',
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'categories',
      list: 'categories',
      create: 'categories/create',
      edit: 'categories/edit/:id',
      show: 'categories/show/:id',
      meta: {
        canDelete: true,
        parent: 'blog_posts',
      },
    },
  ])
}
