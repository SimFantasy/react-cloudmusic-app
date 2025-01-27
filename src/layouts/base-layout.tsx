import { Outlet } from 'react-router'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Player } from '@/components/layout/player'

const BaseLayout = () => {
	return (
		<div className='page-container gap-0 w-full h-screen bg-gradient-to-bl from-blue-500/10 to-card'>
			<Sidebar />
			<div className='page-main relative w-full h-screen'>
				<Header />
				<main className='w-full h-screen overflow-auto'>
					<Outlet />
				</main>
			</div>
			<Player />
		</div>
	)
}

export default BaseLayout
