import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface BearState {
  dark: boolean
  switchDark: () => void
}

const useAppStore = create<BearState>()(
  persist(
    (set, get) => ({
      dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      switchDark: () => {
        document.documentElement.setAttribute('theme-mode', !get().dark ? 'dark' : '')
        set({ dark: !get().dark })
      },
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useAppStore }
