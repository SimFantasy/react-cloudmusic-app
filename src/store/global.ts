import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { SITE } from '@/config'

export enum ThemeState {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system'
}

export interface GlobalState {
	isScrolled: boolean
	scroll: number
	themeState: ThemeState
	setScroll: (scroll: number) => void
	setScrolled: (isScrolled: boolean) => void
	setThemeState: (themeState: ThemeState) => void
}

export const useGlobalStore = create<GlobalState>()(
	immer(
		persist(
			set => ({
				isScrolled: false as boolean,
				scroll: 0,
				themeState: ThemeState.LIGHT as ThemeState,
				setScroll: (scroll: number) => set({ scroll }),
				setScrolled: (isScrolled: boolean) => set({ isScrolled }),
				setThemeState: (themeState: ThemeState) => set({ themeState })
			}),
			{
				name: SITE.STORE.GLOBAL
			}
		)
	)
)
