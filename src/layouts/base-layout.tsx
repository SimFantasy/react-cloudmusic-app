import { useRef } from 'react'
import { Outlet } from 'react-router'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Player } from '@/components/layout/player'

import { useMainScrolled } from '@/hooks/use-main-scrolled'

const BaseLayout: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null)
	useMainScrolled({ ref })
	return (
		<div className='page-container gap-0 w-full h-screen bg-gradient-to-bl from-blue-500/5 to-sky-300/5'>
			<Sidebar />
			<main className='relative page-main grid grid-rows-[auto_1fr] pt-16 w-full h-screen'>
				<Header />
				<div className='w-full h-[calc(100vh-8.5rem)] overflow-auto' ref={ref}>
					<Outlet />
				</div>
			</main>
			<Player />
		</div>
	)
}

export default BaseLayout
