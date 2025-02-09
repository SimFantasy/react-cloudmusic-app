import React, { useState } from 'react'

import { CommentList } from '@/components/comment/comment-list'
import { Empty } from '@/components/common/empty'
import { LoadMore } from '@/components/common/load-more'

import { useAlbumCommentsInfinite } from '@/service/queries/album'

type AlbumDetailCommentProps = {
	albumId?: number
}

export const AlbumDetailComment: React.FC<AlbumDetailCommentProps> = ({ albumId }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = useAlbumCommentsInfinite({
		id: albumId as number,
		page
	})

	return (
		<div className='flex-y-6'>
			{data?.hotComments && data?.hotComments.length > 0 && (
				<div className='flex-y-4'>
					<h2 className='text-xl font-semibold text-primary/80'>精彩评论</h2>
					<CommentList comments={data?.hotComments} loading={loading} />
				</div>
			)}

			{data?.list && data?.list.length > 0 ? (
				<div className='flex-y-4'>
					<h2 className='text-xl font-semibold text-primary/80'>最新评论</h2>
					<LoadMore
						loadMore={loadMore}
						loadingMore={loadingMore}
						noMore={noMore}
						page={page}
						setPage={setPage}
					>
						<CommentList comments={data?.list} loading={loading} />
					</LoadMore>
				</div>
			) : (
				<Empty text='暂无评论' />
			)}
		</div>
	)
}
