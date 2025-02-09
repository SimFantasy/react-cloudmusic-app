import React, { useState } from 'react'
import useUrlState from '@ahooksjs/use-url-state'

import { AlbumCategories } from '@/components/album/album-categories'
import { AlbumList } from '@/components/album/album-list'
import { LoadMore } from '@/components/common/load-more'

import { useAllNewAlbumsInfinite } from '@/service/queries/album'

const Album: React.FC = () => {
	const [page, setPage] = useState(1)
	const [urlState, setUrlState] = useUrlState<{ area?: string }>(undefined)

	const { data, loading, loadMore, loadingMore, noMore } = useAllNewAlbumsInfinite({
		page,
		area: urlState?.area
	})

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<AlbumCategories urlState={urlState} setUrlState={setUrlState} />

				<LoadMore
					loadMore={loadMore}
					noMore={noMore}
					loadingMore={loadingMore}
					page={page}
					setPage={setPage}
				>
					<AlbumList albums={data?.list} loading={loading} />
				</LoadMore>
			</div>
		</div>
	)
}

export default Album
