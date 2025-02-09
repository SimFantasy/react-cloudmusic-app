import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const SearchCardSkeleton: React.FC = () => {
	return (
		<div className='group grid grid-cols-[auto,1fr] items-center gap-x-4 p-4'>
			<Skeleton className='size-16 rounded-lg' />

			<section className='grid grid-rows-[auto,1fr] gap-y-2'>
				<Skeleton className='h-6 w-1/3 rounded-lg' />
				<div className='flex-x-4'>
					<Skeleton className='h-4 w-1/5 rounded-lg' />
					<Skeleton className='h-4 w-1/5 rounded-lg' />
				</div>
			</section>
		</div>
	)
}
