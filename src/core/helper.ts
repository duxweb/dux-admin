import { RouteObject } from 'react-router-dom'
import type { AuthBindings, ResourceProps } from '@refinedev/core'

export interface App {
  authProvider: AuthBindings
  addRouter: (routes: RouteObject[]) => void
  getRouter: () => RouteObject[]
  addResources: (resource: ResourceProps[]) => void
  getResources: () => ResourceProps[]
}

export interface createAppProps {
  authProvider: AuthBindings
}

export const createApp = ({ authProvider }: createAppProps): App => {
  let routers: RouteObject[] = []
  const addRouter = (routes: RouteObject[]) => {
    routers = [...routers, ...routes]
  }
  const getRouter = () => {
    return routers
  }

  let resources: ResourceProps[] = []
  const addResources = (resource: ResourceProps[]) => {
    resources = [...resources, ...resource]
  }
  const getResources = () => {
    return resources
  }

  return {
    authProvider,
    addRouter,
    getRouter,
    addResources,
    getResources,
  }
}
