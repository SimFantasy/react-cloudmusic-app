import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components//ui/aspect-ratio'

export const AlbumSkeleton: React.FC = () => {
	return (
		<div className='group flex-y-2 w-full'>
			<AspectRatio ratio={1} className='relative w-full rounded-lg overflow-hidden'>
				<Skeleton className='size-full' />
			</AspectRatio>
			<Skeleton className='w-full h-4 rounded-lg' />
			<div className='flex-x-4'>
				<Skeleton className='w-24 h-4 rounded-lg' />
				<Skeleton className='w-40 h-4 rounded-lg' />
			</div>
		</div>
	)
}
