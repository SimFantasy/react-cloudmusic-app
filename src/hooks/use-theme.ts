import { useState, useEffect } from 'react'
import { useGlobalStore } from '@/store/global'
import { SITE } from '@/config'

type Theme = 'dark' | 'light' | 'system'

export const useTheme = () => {
	const { themeState, setThemeState } = useGlobalStore()
	const [theme, setTheme] = useState<Theme>(() => (themeState as Theme) || SITE.THEME.DEFAULT_THEME)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	return {
		theme,
		setTheme: (theme: Theme) => {
			setThemeState(theme)
			setTheme(theme)
		}
	}
}
