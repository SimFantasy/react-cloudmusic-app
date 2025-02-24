import React from 'react'

import { ToplistDetailCard } from '@/components/toplist/toplist-detail-card'
import { ToplistDetailSkeleton } from '@/components/toplist/toplist-detail-skeleton'

import { TopList } from '@/types/toplist'

type ToplistDetailListProps = {
	toplists?: TopList[]
	loading: boolean
}

export const ToplistDetailList: React.FC<ToplistDetailListProps> = ({ toplists, loading }) => {
	return (
		<div className='grid grid-cols-3 gap-4'>
			{loading
				? Array.from({ length: 3 }).map((_, index) => <ToplistDetailSkeleton key={index} />)
				: toplists?.map(toplist => <ToplistDetailCard key={toplist.id} toplist={toplist} />)}
		</div>
	)
}
