import React, { useState } from 'react'

import { CommentList } from '@/components/comment/comment-list'
import { LoadMore } from '@/components/common/load-more'

import { usePlaylistCommentsInfinite } from '@/service/queries/playlist'

type DetailCommentProps = {
	playlistId: number
}

export const DetailComment: React.FC<DetailCommentProps> = ({ playlistId }) => {
	const [page, setPage] = useState(1)

	const { data, loading, loadMore, loadingMore, noMore } = usePlaylistCommentsInfinite({
		id: playlistId as number,
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
		</div>
	)
}
