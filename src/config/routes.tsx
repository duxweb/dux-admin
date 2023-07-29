import { Authenticated, ErrorComponent, GitHubBanner, Refine } from '@refinedev/core'
import dataProvider from '@refinedev/simple-rest'
import { Suspense, lazy } from 'react'
import { RouteObject, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'

import { authProvider } from '../authProvider'
import { Layout } from '../components/layout'
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from '../pages/blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from '../pages/categories'
import { ForgotPassword } from '../pages/forgotPassword'
import { Login } from '../pages/login'
import { Register } from '../pages/register'

const lazyComponent = (importComp) => {
  const Comp = lazy(importComp)
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Comp></Comp>
    </Suspense>
  )
}

export function createCustomerRoutes(): RouteObject[] {
  const { t, i18n } = useTranslation()

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }

  return [
    {
      element: (
        <Refine
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          authProvider={authProvider}
          i18nProvider={i18nProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: 'blog_posts',
              list: '/blog-posts',
              create: '/blog-posts/create',
              edit: '/blog-posts/edit/:id',
              show: '/blog-posts/show/:id',
              meta: {
                canDelete: true,
              },
            },
            {
              name: 'categories',
              list: '/categories',
              create: '/categories/create',
              edit: '/categories/edit/:id',
              show: '/categories/show/:id',
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: '75z1iv-x6xVpm-suPmVP',
          }}
        >
          <Layout>
            <Outlet />
          </Layout>
        </Refine>
      ),
      children: [
        {
          index: true,
          element: <NavigateToResource resource='blog_posts' />,
        },
        {
          path: '/blog-posts',
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
          path: '/categories',
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
        {
          path: '*',
          element: <ErrorComponent />,
        },
      ],
    },
    {
      element: (
        <Authenticated fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      ),
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
      ],
    },
  ]
}

export default createCustomerRoutes
