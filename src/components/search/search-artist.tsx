import React, { useState } from 'react'

import { LoadMore } from '@/components/common/load-more'
import { ArtistList } from '@/components/artist/artist-list'

import { useSearchArtistInfinite } from '@/service/queries/search'

type SearchArtistProps = {
	query: string
}

export const SearchArtist: React.FC<SearchArtistProps> = ({ query }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useSearchArtistInfinite({
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
			<ArtistList artists={data?.list} loading={loading} />
		</LoadMore>
	)
}
