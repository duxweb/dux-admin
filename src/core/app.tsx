import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RouteObject, RouterProvider, createHashRouter, Navigate } from 'react-router-dom'
import type { I18nProvider } from '@refinedev/core'
import { ResourceRouteComposition } from '@refinedev/core/dist/interfaces/bindings/resource'
import { useTranslation } from 'react-i18next'
import appsData from '../config/app'
import { createRefine } from './package'
import { App } from './helper'
import config from '../config'

export interface appContext {
  //apps: Record<string, App>
  createApp: (name: string, app: App) => void
  getApp: (name: string) => App
  getApps: () => App[]
  //i18nProvider: I18nProvider
}

export interface appConfig {
  init?: (context: appContext) => void
  register?: (context: appContext) => void
  run?: (context: appContext) => void
}

//const AppContext = createContext({} as appContext)

export const AppProvider = () => {
  const { t, i18n } = useTranslation()

  const i18nProvider: I18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }

  const apps = useMemo(() => {
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

    appsData.map((item) => {
      item?.init?.({
        createApp: createApp,
        getApp: getApp,
        getApps: getApps,
      })
    })

    appsData.map((item) => {
      item?.register?.({
        createApp: createApp,
        getApp: getApp,
        getApps: getApps,
      })
    })

    appsData.map((item) => {
      item?.run?.({
        createApp: createApp,
        getApp: getApp,
        getApps: getApps,
      })
    })

    return apps
  }, [])

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

    Object.keys(apps).map((name) => {
      routes.push(
        createRefine({
          prefix: name ? '/' + name : undefined,
          i18nProvider: i18nProvider,
          authProvider: apps[name].authProvider,
          router: apps[name].getRouter(),
          resources: apps[name].getResources().map((item) => {
            item.list = formatResources(name, item.list)
            item.create = formatResources(name, item.create)
            item.clone = formatResources(name, item.clone)
            item.edit = formatResources(name, item.edit)
            item.show = formatResources(name, item.show)
            return item
          }),
        })
      )
    })
    return createHashRouter(routes)
  }, [])

  return <RouterProvider router={router} />
}
