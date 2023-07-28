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
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

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
import './theme/theme.css'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

function App() {
  const { t, i18n } = useTranslation()

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }

  return (
    <ConfigProvider globalConfig={cnConfig}>
      <BrowserRouter>
        <RefineKbarProvider>
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
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to='/login' />}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource resource='blog_posts' />} />
                <Route path='/blog-posts'>
                  <Route index element={<BlogPostList />} />
                  <Route path='create' element={<BlogPostCreate />} />
                  <Route path='edit/:id' element={<BlogPostEdit />} />
                  <Route path='show/:id' element={<BlogPostShow />} />
                </Route>
                <Route path='/categories'>
                  <Route index element={<CategoryList />} />
                  <Route path='create' element={<CategoryCreate />} />
                  <Route path='edit/:id' element={<CategoryEdit />} />
                  <Route path='show/:id' element={<CategoryShow />} />
                </Route>
                <Route path='*' element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineKbarProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
