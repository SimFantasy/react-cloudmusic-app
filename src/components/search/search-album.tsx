import React, { useState } from 'react'

import { LoadMore } from '@/components/common/load-more'
import { AlbumList } from '@/components/album/album-list'

import { useSearchAlbumInfinite } from '@/service/queries/search'

type SearchAlbumProps = {
	query: string
}

export const SearchAlbum: React.FC<SearchAlbumProps> = ({ query }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useSearchAlbumInfinite({
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
			<AlbumList albums={data?.list} loading={loading} />
		</LoadMore>
	)
}
