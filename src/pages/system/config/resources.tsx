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
      name: 'blog',
      meta: {
        label: 'Blog',
        icon: 'i-tabler:basket',
      },
    },
    {
      name: 'blog-content',
      meta: {
        label: 'Content',
        parent: 'blog',
        icon: 'i-tabler:book',
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
        parent: 'blog-content',
      },
    },
    {
      name: 'categories',
      list: 'categories',
      create: 'categories/create',
      edit: 'categories/edit/:id',
      show: 'categories/show/:id',
      meta: {
        label: 'Categories',
        canDelete: true,
        parent: 'blog-content',
      },
    },
  ])
}
