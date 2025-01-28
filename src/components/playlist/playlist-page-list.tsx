import { useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { useNetizensPlaylistsInfinite } from '@/service/queries/playlist'

import { Button } from '@/components/ui/button'
import { PlaylistList } from './playlist-list'

export const PlaylistPageList = () => {
	const [searchParams] = useSearchParams()
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const [page, setPage] = useRafState(1)
	const cat = searchParams.get('cat') || '全部'

	const { data, loading, loadMore, loadingMore, noMore } = useNetizensPlaylistsInfinite({
		cat,
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

	// 监听cat变化，run
	useEffect(() => {
		setPage(0)
		run()
	}, [cat, run, setPage])

	return (
		<div className='flex-y-4'>
			<PlaylistList playlists={data?.list} loading={loading} />

			<div ref={ref} className='flex-center mt-4'>
				{!noMore && (
					<Button variant='outline' onClick={run} disabled={loadingMore}>
						{loadingMore ? '加载中...' : '加载更多'}
					</Button>
				)}
				{noMore && <span className='text-primary/50 text-sm'>No more data</span>}
			</div>
		</div>
	)
}
