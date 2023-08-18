import { App, lazyComponent } from '@duxweb/dux-refine'

import { BlogPostList } from '../blog-posts'
import { Navigate, redirect } from 'react-router-dom'
import Index from '../home'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      loader: () => redirect('index'),
      //element: <Navigate to='index' />,
    },
    {
      path: 'index',
      element: <Index />,
    },
    {
      path: 'setting',
      element: <Index />,
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
