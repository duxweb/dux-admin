import React from 'react'
import { createRoot } from 'react-dom/client'
import { DuxApp } from '@duxweb/dux-refine'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'

import app from './config/app'
import config from './config'

import '@duxweb/dux-refine/dist/index.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <DuxApp appsData={app} config={config} />
  </React.StrictMode>
)
