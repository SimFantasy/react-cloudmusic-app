import React from 'react'
import { Link } from 'react-router'
import { Disc3 } from 'lucide-react'

import { SITE, ROUTES } from '@/config'
import { cn } from '@/lib/utils'

type LogoProps = {
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'lg' }) => {
	return (
		<Link to={ROUTES.HOME} className='flex-x-2'>
			<Disc3
				className={cn('size-8 fill-blue-200 stroke-blue-500', {
					'size-2': size === 'sm',
					'size-6': size === 'md',
					'size-8': size === 'lg',
					'size-10': size === 'xl',
					'size-12': size === '2xl'
				})}
			/>
			<span
				className={cn(
					'text-blue-900 font-semibold font-logo dark:text-primary',
					{
						'text-sm': size === 'sm',
						'text-lg': size === 'md',
						'text-2xl': size === 'lg',
						'text-3xl': size === 'xl',
						'text-4xl': size === '2xl'
					},
					className
				)}
			>
				{SITE.NAME}
			</span>
		</Link>
	)
}
