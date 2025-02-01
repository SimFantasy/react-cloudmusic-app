import { Skeleton } from '@/components/ui/skeleton'

export const ArtistSkeleton = () => {
	return (
		<div className='p-6 flex-y-2 items-center w-full'>
			<Skeleton className='size-full rounded-full' />
			<div className='text-y-1'>
				<Skeleton className='w-1/2 h-4 rounded-lg' />
				<Skeleton className='w-1/4 h-4 rounded-lg' />
			</div>
		</div>
	)
}
