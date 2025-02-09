import React, { useState } from 'react'

import { LoadMore } from '@/components/common/load-more'
import { MvList } from '@/components/mv/mv-list'

import { useSearchMvInfinite } from '@/service/queries/search'

type SearchMvProps = {
	query: string
}

export const SearchMv: React.FC<SearchMvProps> = ({ query }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useSearchMvInfinite({
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
			<MvList mvs={data?.list} loading={loading} />
		</LoadMore>
	)
}
