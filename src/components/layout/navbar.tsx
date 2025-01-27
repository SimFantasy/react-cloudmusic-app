import { NAVS } from '@/config'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router'

export const Navbar = () => {
	return (
		<nav className='flex-y-1 px-4'>
			{NAVS.map(nav => {
				const Icon = nav.icon
				return (
					<NavLink key={nav.name} to={nav.route} className={cn('nav-link')}>
						<Icon className='size-5' />
						<span>{nav.name}</span>
					</NavLink>
				)
			})}
		</nav>
	)
}
