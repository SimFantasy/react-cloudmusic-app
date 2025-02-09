import React, { useRef, useEffect } from 'react'
import { useInViewport, useDebounceFn } from 'ahooks'

import { Button } from '@/components/ui/button'

type LoadMoreProps = {
	children: React.ReactNode
	loadMore: () => void
	noMore: boolean
	loadingMore: boolean
	page: number
	setPage: (page: number) => void
}

export const LoadMore: React.FC<LoadMoreProps> = ({
	children,
	loadMore,
	noMore,
	loadingMore,
	page,
	setPage
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [inViewport] = useInViewport(ref)

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
			{children}

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
