import React from 'react'

import { useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Searchbar } from '@/components/layout/searchbar'
import { UserButton } from '@/components/layout/user-button'
import { OptionsButton } from '@/components/layout//options-button'

export const Header: React.FC = () => {
	const navigate = useNavigate()
	return (
		<header className='absolute z-[800] top-0 right-0 flex-x-4 justify-between px-4 w-full h-16 bg-card/95 backdrop-blur-sm'>
			{/* Left */}
			<section className='flex-x-2'>
				{/* Back Button */}
				<Button
					variant='outline'
					className='button-free px-1.5 py-2 button-primary'
					onClick={() => navigate(-1)}
				>
					<ChevronLeft className='size-6' />
				</Button>

				{/* Search bar */}
				<Searchbar />
			</section>

			{/* Right */}
			<section className='flex-end gap-x-4'>
				<UserButton />

				<OptionsButton />
			</section>
		</header>
	)
}
