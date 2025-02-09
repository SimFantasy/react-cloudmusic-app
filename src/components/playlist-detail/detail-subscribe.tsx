import React, { useState } from 'react'

import { SubscribeList } from '@/components/subscribe/subscribe-list'
import { LoadMore } from '@/components/common/load-more'

import { usePlaylistSubscriberInfinite } from '@/service/queries/playlist'

type DetailSubscribeProps = {
	playlistId: number
}

export const DetailSubscribe: React.FC<DetailSubscribeProps> = ({ playlistId }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = usePlaylistSubscriberInfinite({
		id: playlistId as number,
		page
	})

	return (
		<div className='flex-y-4'>
			<LoadMore
				loadMore={loadMore}
				noMore={noMore}
				loadingMore={loadingMore}
				page={page}
				setPage={setPage}
			>
				<SubscribeList subscribes={data?.list} loading={loading} />
			</LoadMore>
		</div>
	)
}
