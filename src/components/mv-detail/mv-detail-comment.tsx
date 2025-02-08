import { useRef, useEffect } from 'react'
import { useRafState, useInViewport, useDebounceFn } from 'ahooks'

import { Button } from '@/components/ui/button'
import { CommentList } from '@/components/comment/comment-list'

import { useMvCommentsInfinite } from '@/service/queries/mv'

type MvDetailCommentProps = {
	mvid?: number
}

export const MvDetailComment = ({ mvid }: MvDetailCommentProps) => {
	const [page, setPage] = useRafState(1)
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

	const { data, loading, loadMore, loadingMore, noMore } = useMvCommentsInfinite({
		id: mvid as number,
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
		<div className='flex-y-6'>
			{data?.hotComments && data?.hotComments.length > 0 && (
				<div className='flex-y-4'>
					<h2 className='text-xl font-semibold text-primary/80'>精彩评论</h2>
					<CommentList comments={data?.hotComments} loading={loading} />
				</div>
			)}

			<div className='flex-y-4'>
				<h2 className='text-xl font-semibold text-primary/80'>最新评论</h2>
				<CommentList comments={data?.list} loading={loading} />
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
