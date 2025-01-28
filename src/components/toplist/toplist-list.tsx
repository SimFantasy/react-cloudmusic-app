import { ToplistCard } from '@/components/toplist/toplist-card'
import { ToplistSkeleton } from '@/components/toplist/toplist-skeleton'

import { TopList } from '@/types/toplist'

type ToplistListProps = {
	toplists?: TopList[]
	loading: boolean
	p?: 0 | 1 | 2 | 3
}

export const ToplistList = ({ toplists, loading, p }: ToplistListProps) => {
	return (
		<div className='grid grid-cols-6 gap-4'>
			{loading
				? Array.from({ length: 6 }, (_, i) => i).map(i => <ToplistSkeleton key={i} />)
				: toplists?.map(toplist => <ToplistCard key={toplist.id} toplist={toplist} p={p} />)}
		</div>
	)
}
