import { Link } from 'react-router'
import { Disc3 } from 'lucide-react'
import { SITE, ROUTES } from '@/config'

export const Logo = () => {
	return (
		<Link to={ROUTES.HOME} className='flex-x-2'>
			<Disc3 className='size-8 fill-blue-200 stroke-blue-500 animate-slow-spin' />
			<span className='text-2xl text-blue-900 font-semibold font-logo'>{SITE.NAME}</span>
		</Link>
	)
}
