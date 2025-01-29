import { useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { PlaylistList } from '@/components/playlist/playlist-list'
import { PlaylistHotCategories } from '@/components/playlist/playlist-hot-categories'
import { Button } from '@/components/ui/button'

import { useNetizensPlaylistsInfinite } from '@/service/queries/playlist'

const Playlist = () => {
	const [searchParams] = useSearchParams()
	const [page, setPage] = useRafState(1)
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const order = (searchParams.get('order') as 'new' | 'hot' | undefined) || 'hot'
	const cat = searchParams.get('cat') || '全部'

	const { data, loading, loadMore, loadingMore, noMore } = useNetizensPlaylistsInfinite({
		order,
		cat,
		page
	})
	//
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
		<>
			<PlaylistHotCategories />
			<div className='page-wrapper page-content'>
				<div className='page-block'>
					<div className='flex-y-4'>
						<PlaylistList playlists={data?.list} loading={loading} />

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
			</div>
		</>
	)
}

export default Playlist
