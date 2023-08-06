import { App } from '@/core/helper'

import { NavigateToResource } from '@refinedev/react-router-v6'
import { BlogPostList } from '../../admin/blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from '../../admin/categories'
import { lazyComponent } from '@/core/package'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      element: <NavigateToResource resource='index' />,
    },
    {
      path: 'index',
      element: lazyComponent(() => import('../admin/home/index')),
    },
    {
      path: 'blog-posts',
      children: [
        {
          index: true,
          element: <BlogPostList />,
        },
      ],
    },
    {
      path: 'categories',
      children: [
        {
          index: true,
          element: <CategoryList />,
        },
        {
          path: 'create',
          element: <CategoryCreate />,
        },
        {
          path: 'edit/:id',
          element: <CategoryEdit />,
        },
        {
          path: 'show/:id',
          element: <CategoryShow />,
        },
      ],
    },
  ])
}
