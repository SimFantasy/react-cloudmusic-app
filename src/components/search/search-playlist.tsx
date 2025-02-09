import React, { useState } from 'react'

import { LoadMore } from '@/components/common/load-more'
import { PlaylistList } from '@/components/playlist/playlist-list'

import { useSearchPlaylistInfinite } from '@/service/queries/search'

type SearchPlaylistProps = {
	query: string
}

export const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ query }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useSearchPlaylistInfinite({
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
			<PlaylistList playlists={data?.list} loading={loading} />
		</LoadMore>
	)
}
