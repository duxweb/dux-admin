import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'
import { presetDux } from '@duxweb/dux-plugin'

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        dark: '[theme-mode="dark"]',
      },
    }),
    presetIcons(),
    presetTypography(),
    presetDux(),
  ],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts,jsx,tsx}',
        // dux refine
        /dux-refine\.(js)(x?)$/,
      ],
      // exclude files
      exclude: [],
    },
  },

  shortcuts: {},
  screens: {},
})
