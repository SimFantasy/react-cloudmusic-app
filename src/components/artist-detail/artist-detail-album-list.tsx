import React, { useState } from 'react'

import { AlbumList } from '@/components/album/album-list'
import { LoadMore } from '@/components/common/load-more'

import { useArtistAlbumsInfinite } from '@/service/queries/artist'

type ArtistDetailAlbumListProps = {
	artistId?: string
}

export const ArtistDetailAlbumList: React.FC<ArtistDetailAlbumListProps> = ({ artistId }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useArtistAlbumsInfinite({
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
				<AlbumList albums={data?.list} loading={loading} />
			</LoadMore>
		</div>
	)
}
