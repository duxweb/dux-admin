import { App } from '@/core/helper'

import { BlogPostList } from '../blog-posts'
import { lazyComponent } from '@/core/package'
import { Navigate } from 'react-router-dom'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      element: <Navigate to='index' />,
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
