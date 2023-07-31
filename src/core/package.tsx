import { Authenticated, ErrorComponent, Refine } from '@refinedev/core'
import type { I18nProvider, AuthBindings, ResourceProps } from '@refinedev/core'
import dataProvider from '@refinedev/simple-rest'
import { ComponentType, Suspense, lazy } from 'react'
import { RouteObject, Outlet } from 'react-router-dom'
import routerBindings, { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6'
import { Layout } from '../components/layout'
import { ForgotPassword } from '../pages/admin/forgotPassword'
import { Login } from '../pages/admin/login'
import { Register } from '../pages/admin/register'
import config from '../config'

export const lazyComponent = (importComp: () => Promise<{ default: ComponentType<any> }>) => {
  const Comp = lazy(importComp)
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Comp></Comp>
    </Suspense>
  )
}

export interface createRefineProps {
  prefix?: string
  i18nProvider: I18nProvider
  authProvider: AuthBindings
  router: RouteObject[]
  resources: ResourceProps[]
}

export const createRefine = ({
  prefix,
  i18nProvider,
  authProvider,
  router,
  resources,
}: createRefineProps): RouteObject => {
  return {
    path: prefix,
    element: (
      <Refine
        dataProvider={dataProvider(config.apiUrl)}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        routerProvider={routerBindings}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: config.projectId,
        }}
      >
        <Outlet />
      </Refine>
    ),
    children: [
      {
        element: (
          <Authenticated fallback={<CatchAllNavigate to='login' />}>
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        ),
        children: [
          ...router,
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
    ],
  }
}
