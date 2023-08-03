import { useMemo } from 'react'
import { RouteObject, RouterProvider, createHashRouter, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { I18nProvider } from '@refinedev/core'
import { ResourceRouteComposition } from '@refinedev/core/dist/interfaces/bindings/resource'

import appsData from '../config/app'
import { createRefine } from './package'
import { App } from './helper'
import config from '../config'

export interface appContext {
  createApp: (name: string, app: App) => void
  getApp: (name: string) => App
  getApps: () => App[]
  addI18n: (lng: string, ns: string, resources: any) => void
}

export interface appConfig {
  init?: (context: appContext) => void
  register?: (context: appContext) => void
  run?: (context: appContext) => void
}

interface HookApp {
  i18nProvider: I18nProvider
  apps: Record<string, App>
}

const useApp = (): HookApp => {
  const { t, i18n } = useTranslation()

  const apps = useMemo<Record<string, App>>(() => {
    const apps: Record<string, App> = {}

    const createApp = (name: string, app: App) => {
      apps[name] = app
    }

    const getApp = (name: string): App => {
      return apps[name]
    }

    const getApps = (): App[] => {
      return Object.values(apps.current)
    }

    const addI18n = (lng: string, ns: string, resources: any) => {
      i18n.addResourceBundle(lng, ns, resources)
    }

    appsData.map((item) => {
      item?.init?.({ createApp, getApp, getApps, addI18n })
    })

    appsData.map((item) => {
      item?.register?.({ createApp, getApp, getApps, addI18n })
    })

    appsData.map((item) => {
      item?.run?.({ createApp, getApp, getApps, addI18n })
    })

    return apps
  }, [i18n])

  return {
    i18nProvider: {
      translate: (key: string, params: object) => t(key, params),
      changeLocale: (lang: string) => i18n.changeLanguage(lang),
      getLocale: () => i18n.language,
    },
    apps: apps,
  }
}

export const AppProvider = () => {
  const app = useApp()

  const router = useMemo(() => {
    const routes: RouteObject[] = [
      {
        index: true,
        element: <Navigate to={config.defaultPath} />,
      },
    ]

    const formatResources = (
      name: string,
      res?: ResourceRouteComposition
    ): ResourceRouteComposition | undefined => {
      return typeof res === 'string' && name ? ['/' + name, res].join('/') : res
    }

    Object.keys(app.apps).map((name) => {
      const refine = createRefine({
        prefix: name ? '/' + name : undefined,
        i18nProvider: app.i18nProvider,
        authProvider: app.apps[name].authProvider,
        router: app.apps[name].getRouter(),
        resources: app.apps[name].getResources().map((item) => {
          item.list = formatResources(name, item.list)
          item.create = formatResources(name, item.create)
          item.clone = formatResources(name, item.clone)
          item.edit = formatResources(name, item.edit)
          item.show = formatResources(name, item.show)
          return item
        }),
      })
      routes.push(refine)
    })
    return createHashRouter(routes)
  }, [app])

  return <RouterProvider router={router} />
}
