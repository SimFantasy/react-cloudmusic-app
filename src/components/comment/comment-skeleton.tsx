import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const CommentSkeleton: React.FC = () => {
	return (
		<div className='grid grid-cols-[auto,1fr] gap-4 items-start pb-4 w-full'>
			<Skeleton className='size-10 rounded-full' />

			<div className='flex flex-col'>
				<h1 className='flex-x-2'>
					<Skeleton className='w-40 h-4 rounded-lg' />
				</h1>
				<div className='flex-y-2'>
					<Skeleton className='w-full h-4 rounded-lg' />
					<Skeleton className='w-1/2 h-4 rounded-lg' />
				</div>

				<div className='flex-x-4 justify-between text-xs pt-2'>
					<Skeleton className='w-1/5 h-3 rounded-lg' />
				</div>
			</div>
		</div>
	)
}
