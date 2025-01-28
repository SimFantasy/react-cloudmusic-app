import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const ToplistSkeleton = () => {
	return (
		<div className='w-full'>
			<AspectRatio ratio={1}>
				<Skeleton className='size-full rounded-lg' />
			</AspectRatio>
		</div>
	)
}
