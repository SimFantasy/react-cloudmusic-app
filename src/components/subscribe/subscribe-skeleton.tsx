import React from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { Skeleton } from '@/components/ui/skeleton'

export const SubscribeSkeleton: React.FC = () => {
	return (
		<div className='flex-y-2 p-4 w-full'>
			<div className='w-full'>
				<AspectRatio ratio={1} className='w-full rounded-full overflow-hidden'>
					<Skeleton className='size-full' />
				</AspectRatio>
			</div>
			<Skeleton className='w-1/2 h-4' />
			<Skeleton className='w-1/4 h-3' />
		</div>
	)
}
