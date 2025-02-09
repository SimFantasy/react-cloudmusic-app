import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components//ui/aspect-ratio'

export const MvSkeleton: React.FC = () => {
	return (
		<div className='flex-y-2 w-full'>
			<AspectRatio ratio={16 / 9} className='w-full rounded-lg overflow-hidden'>
				<Skeleton className='size-full' />
			</AspectRatio>
			<div className='text-center'>
				<Skeleton className='w-1/2 h-4 rounded-lg' />
			</div>
		</div>
	)
}
