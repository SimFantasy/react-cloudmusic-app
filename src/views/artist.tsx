import { useRef, useEffect } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { Button } from '@/components/ui/button'

import { ArtistCategories } from '@/components/artist/artist-categories'
import { ArtistList } from '@/components/artist/artist-list'
import { useArtistsInfinite } from '@/service/queries/artist'
import type { ArtistCategory } from '@/types/artist'

const Artist = () => {
	const [urlState, setUrlState] = useUrlState<ArtistCategory>(undefined)
	const [page, setPage] = useRafState(1)
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const { data, loading, loadMore, loadingMore, noMore } = useArtistsInfinite({
		initial: urlState?.initial,
		type: urlState?.type,
		area: urlState?.area,
		page
	})

	const { run } = useDebounceFn(
		() => {
			setPage(page + 1)
			loadMore()
		},
		{ wait: 500 }
	)
	// 监听inViewPort，触发loadMore
	useEffect(() => {
		if (inViewport) {
			run()
		}
	}, [inViewport, run])
	return (
		<div className='page-wrapper page-content'>
			<div className='page-block gap-y-6'>
				<ArtistCategories urlState={urlState} setUrlState={setUrlState} />

				<ArtistList artists={data?.list} loading={loading} />

				<div ref={ref} className='flex-center mt-4'>
					{!noMore && (
						<Button variant='outline' size='sm' onClick={run} disabled={loadingMore}>
							{loadingMore ? '加载中...' : '加载更多'}
						</Button>
					)}
					{noMore && <span className='text-primary/50 text-sm'>No more data</span>}
				</div>
			</div>
		</div>
	)
}

export default Artist
