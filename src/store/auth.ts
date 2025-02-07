import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { SITE } from '@/config'

import { UserDetail } from '@/types/auth'

export interface AuthState {
	userInfo: UserDetail | null
	isLogin: boolean

	setUserInfo: (userInfo: UserDetail | null) => void
	setIsLogin: (isLogin: boolean) => void
}

export const useAuthStore = create<AuthState>()(
	immer(
		persist(
			set => ({
				userInfo: null,
				isLogin: false,

				setUserInfo: userInfo => set({ userInfo: userInfo }),
				setIsLogin: isLogin => set({ isLogin })
			}),
			{
				name: SITE.STORE.USER
			}
		)
	)
)
