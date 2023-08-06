import react from '@vitejs/plugin-react'
import * as path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { DuxUI } from './vite'
import { theme } from './src/theme/theme'

export default defineConfig({
  plugins: [react(), UnoCSS(), DuxUI()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: theme(),
      },
    },
  },
})
