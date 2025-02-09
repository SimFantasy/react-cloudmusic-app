import React, { useState } from 'react'

import { LoadMore } from '@/components/common/load-more'
import { DetailSongList } from '@/components/playlist-detail/detail-song-list'

import { useSearchSongInfinite } from '@/service/queries/search'

type SearchSongProps = {
	query: string
}

export const SearchSong: React.FC<SearchSongProps> = ({ query }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useSearchSongInfinite({
		keywords: query,
		page
	})
	return (
		<LoadMore
			loadMore={loadMore}
			noMore={noMore}
			loadingMore={loadingMore}
			page={page}
			setPage={setPage}
		>
			<DetailSongList songs={data?.list} loading={loading} />
		</LoadMore>
	)
}
