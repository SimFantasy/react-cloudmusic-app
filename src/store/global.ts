import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { SITE } from '@/config'

export interface GlobalState {
	isScrolled: boolean
	scroll: number
	themeState: 'dark' | 'light' | 'system'
	setScroll: (scroll: number) => void
	setScrolled: (isScrolled: boolean) => void
	setThemeState: (themeState: 'dark' | 'light' | 'system') => void
}

export const useGlobalStore = create<GlobalState>()(
	immer(
		persist(
			set => ({
				isScrolled: false,
				scroll: 0,
				themeState: 'light',
				setScroll: (scroll: number) => set({ scroll }),
				setScrolled: (isScrolled: boolean) => set({ isScrolled }),
				setThemeState: (themeState: 'dark' | 'light' | 'system') => set({ themeState })
			}),
			{
				name: SITE.STORE.GLOBAL
			}
		)
	)
)
