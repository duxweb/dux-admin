import { ErrorComponent } from '@refinedev/core'
import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const lazyComponent = (importComp) => {
  const Comp = lazy(importComp)
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Comp></Comp>
    </Suspense>
  )
}

const routes: RouteObject[] = [
  {
    path: '/blog-posts',
    element: lazyComponent(() => import('../pages/blog-posts')),
  },
  {
    path: '*',
    element: <ErrorComponent />,
  },
]

export default routes
