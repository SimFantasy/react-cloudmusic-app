import React, { useState } from 'react'
import { useSearchParams } from 'react-router'

import { PlaylistList } from '@/components/playlist/playlist-list'
import { PlaylistHotCategories } from '@/components/playlist/playlist-hot-categories'
import { LoadMore } from '@/components/common/load-more'

import { useNetizensPlaylistsInfinite } from '@/service/queries/playlist'

const Playlist: React.FC = () => {
	const [searchParams] = useSearchParams()
	const [page, setPage] = useState(1)

	const order = (searchParams.get('order') as 'new' | 'hot' | undefined) || 'hot'
	const cat = searchParams.get('cat') || '全部'

	const { data, loading, loadMore, loadingMore, noMore } = useNetizensPlaylistsInfinite({
		order,
		cat,
		page
	})

	return (
		<>
			<PlaylistHotCategories />
			<div className='page-wrapper page-content'>
				<div className='page-block'>
					<div className='flex-y-4'>
						<LoadMore
							loadMore={loadMore}
							loadingMore={loadingMore}
							noMore={noMore}
							page={page}
							setPage={setPage}
						>
							<PlaylistList playlists={data?.list} loading={loading} />
						</LoadMore>
					</div>
				</div>
			</div>
		</>
	)
}

export default Playlist
