import { TopList } from '@/types/toplist'
import { ToplistDetailCard } from '@/components/toplist/toplist-detail-card'
import { ToplistDetailSkeleton } from '@/components/toplist/toplist-detail-skeleton'

type ToplistDetailListProps = {
	toplists?: TopList[]
	loading: boolean
}

export const ToplistDetailList = ({ toplists, loading }: ToplistDetailListProps) => {
	return (
		<div className='grid grid-cols-3 gap-4'>
			{loading
				? Array.from({ length: 3 }).map((_, index) => <ToplistDetailSkeleton key={index} />)
				: toplists?.map(toplist => <ToplistDetailCard key={toplist.id} toplist={toplist} />)}
		</div>
	)
}
