import React from 'react'
import { Shirt } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

export const OptionsButton: React.FC = () => {
	const { theme, setTheme } = useTheme()
	const handleThemeChange = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}
	return (
		<div className='flex-x-2'>
			<Button
				variant='ghost'
				className='button-free button-primary !w-9'
				onClick={handleThemeChange}
			>
				<Shirt
					className={cn('size-5', {
						'fill-blue-500 stroke-blue-500': theme === 'dark'
					})}
				/>
			</Button>
		</div>
	)
}
