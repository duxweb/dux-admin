// refine
import { RefineKbarProvider } from '@refinedev/kbar'

// components
import './App.css'

// tdesign
import { ConfigProvider } from 'tdesign-react/esm'
import 'tdesign-react/esm/style/index.js'
import enConfig from 'tdesign-react/es/locale/en_US'
import cnConfig from 'tdesign-react/es/locale/zh_CN'

// app
import { useAppStore } from './stores/app'
import { AppProvider } from './core/app'

// echarts
import { registerCharts } from './theme/echarts'
registerCharts()

function App() {
  const dark = useAppStore((state) => state.dark)
  document.documentElement.setAttribute('theme-mode', dark ? 'dark' : '')

  return (
    <ConfigProvider globalConfig={cnConfig}>
      <RefineKbarProvider>
        <AppProvider />
      </RefineKbarProvider>
    </ConfigProvider>
  )
}

export default App
