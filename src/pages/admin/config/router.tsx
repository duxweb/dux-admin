import { App, lazyComponent } from '@duxweb/dux-refine'

import { BlogPostList } from '../blog-posts'
import { Navigate, redirect } from 'react-router-dom'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      loader: () => redirect('index'),
      //element: <Navigate to='index' />,
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
