import React from 'react'

import { ToplistCard } from '@/components/toplist/toplist-card'
import { ToplistSkeleton } from '@/components/toplist/toplist-skeleton'

import { TopList } from '@/types/toplist'

type ToplistListProps = {
	toplists?: TopList[]
	loading: boolean
	p?: 0 | 1 | 2 | 3 // 文字垂直位置，0：隐藏， 1-3：数字越大，文字越靠下
}

export const ToplistList: React.FC<ToplistListProps> = ({ toplists, loading, p }) => {
	return (
		<div className='grid grid-cols-6 gap-4'>
			{loading
				? Array.from({ length: 6 }, (_, i) => i).map(i => <ToplistSkeleton key={i} />)
				: toplists?.map(toplist => <ToplistCard key={toplist.id} toplist={toplist} p={p} />)}
		</div>
	)
}
