import { useRef, useEffect } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { Button } from '@/components/ui/button'

import { AlbumList } from '@/components/album/album-list'
import { useAllNewAlbumsInfinite } from '@/service/queries/album'
import { AlbumCategories } from '@/components/album/album-categories'

const Album: React.FC = () => {
	const [page, setPage] = useRafState(1)
	const [urlState, setUrlState] = useUrlState<{ area?: string }>(undefined)
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const { data, loading, loadMore, loadingMore, noMore } = useAllNewAlbumsInfinite({
		page,
		area: urlState?.area
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
			<div className='page-block'>
				<AlbumCategories urlState={urlState} setUrlState={setUrlState} />
				<AlbumList albums={data?.list} loading={loading} />

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

export default Album
