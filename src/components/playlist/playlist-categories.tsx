import React, { useState } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import { ChevronDown } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Loader } from '@/components/common/loader'

import { usePlaylistCategories } from '@/service/queries/playlist'
import { cn } from '@/lib/utils'

export const PlaylistCategories: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [currentTab, setCurrentTab] = useState('0')

	const [catState, setCatState] = useUrlState<{ cat?: string }>(undefined)

	const { data, loading, run } = usePlaylistCategories()

	const handleOpenChange = (open: boolean) => {
		setOpen(open)
		run()
	}

	const handleChooseCat = (cat: string) => {
		setCatState({ cat })
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button className='category-link flex-x-1'>
					<span>全部分类</span>
					<ChevronDown
						className={cn('size-4 trans-all rotate-0 duration-150', { '-rotate-90': open })}
					/>
				</button>
			</PopoverTrigger>

			<PopoverContent className='w-[480px] h-[240px] shadow-lg'>
				{loading ? (
					<Loader />
				) : (
					<div className='flex-y-6'>
						<section className='flex-x-4'>
							{Object.keys(data?.categories || {}).map(key => (
								<button
									key={key}
									onClick={() => setCurrentTab(key)}
									className={cn(
										'relative text-base text-primary/50 after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-1 after:bg-blue-500/0 after:rounded-full',
										{
											'text-primary after:bg-blue-500': currentTab === key
										}
									)}
								>
									{data?.categories[key]}
								</button>
							))}
						</section>

						<section className='flex-start flex-wrap gap-2'>
							{data?.sub
								.filter(sub => sub.category === Number(currentTab))
								.map(sub => (
									<button
										key={sub.name}
										className={cn('category-link sm', {
											active: sub.name === catState
										})}
										onClick={() => handleChooseCat(sub.name)}
									>
										{sub.name}
									</button>
								))}
						</section>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}
