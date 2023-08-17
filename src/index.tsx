import React from 'react'
import { createRoot } from 'react-dom/client'
import { DuxApp } from '@duxweb/dux-refine'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

import app from './config/app'
import config from './config'
import '@duxweb/dux-refine/es/i18n'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <React.Suspense fallback='loading'>
      <DuxApp appsData={app} config={config} />
    </React.Suspense>
  </React.StrictMode>
)
