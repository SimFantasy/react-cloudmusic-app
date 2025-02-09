import React, { useState } from 'react'

import { MvList } from '@/components/mv/mv-list'
import { LoadMore } from '@/components/common/load-more'

import { useArtistMvsInfinite } from '@/service/queries/artist'

type ArtistDetailMvListProps = {
	artistId?: string
}

export const ArtistDetailMvList: React.FC<ArtistDetailMvListProps> = ({ artistId }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useArtistMvsInfinite({
		id: Number(artistId),
		page
	})

	return (
		<div className='flex-y-4'>
			<LoadMore
				loadMore={loadMore}
				loadingMore={loadingMore}
				noMore={noMore}
				page={page}
				setPage={setPage}
			>
				<MvList mvs={data?.list} loading={loading} />
			</LoadMore>
		</div>
	)
}
