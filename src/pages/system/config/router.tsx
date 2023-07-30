import { App } from '@/src/core/helper'

import { NavigateToResource } from '@refinedev/react-router-v6'
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from '../../admin/blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from '../../admin/categories'

export const adminRouter = (app: App) => {
  app.addRouter([
    {
      index: true,
      element: <NavigateToResource resource='blog_posts' />,
    },
    {
      path: 'blog-posts',
      children: [
        {
          index: true,
          element: <BlogPostList />,
        },
        {
          path: 'create',
          element: <BlogPostCreate />,
        },
        {
          path: 'edit/:id',
          element: <BlogPostEdit />,
        },
        {
          path: 'show/:id',
          element: <BlogPostShow />,
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
