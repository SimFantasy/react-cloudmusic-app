import { Skeleton } from '@/components/ui/skeleton'

export const ToplistDetailSkeleton: React.FC = () => {
	return (
		<div className='w-full h-36'>
			<Skeleton className='size-full rounded-lg' />
		</div>
	)
}
