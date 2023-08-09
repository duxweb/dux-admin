import { App } from '@/core/helper'

import { NavigateToResource } from '@refinedev/react-router-v6'
import { BlogPostList } from '../blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from '../categories'
import { lazyComponent } from '@/core/package'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      element: <NavigateToResource resource='index' />,
    },
    {
      path: 'index',
      element: lazyComponent(() => import('../home/index')),
    },
    {
      path: 'setting',
      element: lazyComponent(() => import('../home/index')),
    },
    {
      path: 'article',
      children: [
        {
          index: true,
          element: <BlogPostList />,
        },
      ],
    },
  ])
}
