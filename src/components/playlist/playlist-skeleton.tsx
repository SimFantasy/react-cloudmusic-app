import { Skeleton } from '@/components/ui/skeleton'

export const PlaylistSkeleton: React.FC = () => {
	return (
		<div className='flex-y-2 w-full h-60'>
			<Skeleton className='w-full h-48 rounded-lg' />
			<Skeleton className='w-full h-4 rounded-md' />
			<Skeleton className='w-1/2 h-4 rounded-md' />
		</div>
	)
}
