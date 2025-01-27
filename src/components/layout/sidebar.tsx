import { Logo } from '../common/logo'
import { Navbar } from './navbar'

export const Sidebar = () => {
	return (
		<aside className='page-sidebar flex-y-4 bg-gradient-to-tr from-blue-500/10 to-sky-500/5'>
			<div className='p-4 h-16'>
				<Logo />
			</div>

			<Navbar />
		</aside>
	)
}
