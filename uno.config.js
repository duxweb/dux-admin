import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

import { presetDux } from '@duxweb/dux-ui'

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetTypography(), presetDux()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
        /(.*\/)dux-ui(.*)\.(c|m)?(js)(x?)$/,
        'node_modules/@duxweb/dux-ui/dist/*.{jsx,tsx,js,ts}',
      ],
      // exclude files
      exclude: [],
    },
  },

  //theme: presetDux().theme,
  shortcuts: {
    'text-placeholder': 'text-black/30 dark:text-gray/30',
  },
  screens: {
    'dark-mode': { raw: '(prefers-color-scheme: dark)' },
  },
})
