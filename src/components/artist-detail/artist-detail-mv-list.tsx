import { useRef, useEffect } from 'react'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { Button } from '@/components/ui/button'
import { MvList } from '@/components/mv/mv-list'

import { useArtistMvsInfinite } from '@/service/queries/artist'

type ArtistDetailMvListProps = {
	artistId: string
}

export const ArtistDetailMvList = ({ artistId }: ArtistDetailMvListProps) => {
	const [page, setPage] = useRafState(1)
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const { data, loading, loadMore, loadingMore, noMore } = useArtistMvsInfinite({
		id: Number(artistId),
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
		<div className='flex-y-4'>
			<MvList mvs={data?.list} loading={loading} />

			<div ref={ref} className='flex-center mt-4'>
				{!noMore && (
					<Button variant='outline' size='sm' onClick={run} disabled={loadingMore}>
						{loadingMore ? '加载中...' : '加载更多'}
					</Button>
				)}
				{noMore && <span className='text-primary/50 text-sm'>No more data</span>}
			</div>
		</div>
	)
}
