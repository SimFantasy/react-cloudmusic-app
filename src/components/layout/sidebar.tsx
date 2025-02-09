import React from 'react'

import { Logo } from '@/components/common/logo'
import { Navbar } from '@/components/layout/navbar'

export const Sidebar: React.FC = () => {
	return (
		<aside className='page-sidebar flex-y-4 bg-gradient-to-tr from-blue-500/10 to-sky-500/5'>
			<div className='p-4 h-16'>
				<Logo />
			</div>

			<Navbar />
		</aside>
	)
}
