import React, { useState } from 'react'
import useUrlState from '@ahooksjs/use-url-state'

import { ArtistCategories } from '@/components/artist/artist-categories'
import { ArtistList } from '@/components/artist/artist-list'
import { LoadMore } from '@/components/common/load-more'

import { useArtistsInfinite } from '@/service/queries/artist'
import type { ArtistCategory } from '@/types/artist'

const Artist: React.FC = () => {
	const [urlState, setUrlState] = useUrlState<ArtistCategory>(undefined)
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useArtistsInfinite({
		initial: urlState?.initial,
		type: urlState?.type,
		area: urlState?.area,
		page
	})

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block gap-y-6'>
				<ArtistCategories urlState={urlState} setUrlState={setUrlState} />

				<LoadMore
					loadMore={loadMore}
					noMore={noMore}
					loadingMore={loadingMore}
					page={page}
					setPage={setPage}
				>
					<ArtistList artists={data?.list} loading={loading} />
				</LoadMore>
			</div>
		</div>
	)
}

export default Artist
