// refine
import { Authenticated, ErrorComponent, GitHubBanner, Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import dataProvider from '@refinedev/simple-rest'
import { useTranslation } from 'react-i18next'
import {
  HashRouter,
  Outlet,
  Route,
  Routes,
  useRoutes,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'

// components
import './App.css'
import { authProvider } from './authProvider'
import { Layout } from './components/layout'
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from './pages/blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from './pages/categories'
import { ForgotPassword } from './pages/forgotPassword'
import { Login } from './pages/login'
import { Register } from './pages/register'

// tdesign
import { ConfigProvider } from 'tdesign-react/esm'
import 'tdesign-react/esm/style/index.js'
import enConfig from 'tdesign-react/es/locale/en_US'
import cnConfig from 'tdesign-react/es/locale/zh_CN'

// app
import { useAppStore } from './stores/app'
import createCustomerRoutes from './config/routes'

function App() {
  const dark = useAppStore((state) => state.dark)
  document.documentElement.setAttribute('theme-mode', dark ? 'dark' : '')

  const router = createHashRouter(createCustomerRoutes())

  const { t, i18n } = useTranslation()

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }

  return (
    <ConfigProvider globalConfig={cnConfig}>
      <RefineKbarProvider>
        <RouterProvider router={router} />
      </RefineKbarProvider>
    </ConfigProvider>
  )
}

export default App
