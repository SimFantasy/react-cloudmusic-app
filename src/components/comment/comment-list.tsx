import React from 'react'

import { CommentCard } from '@/components/comment/comment-card'
import { CommentSkeleton } from '@/components/comment/comment-skeleton'

import { SITE } from '@/config'
import { Comment } from '@/types/comment'

type CommentListProps = {
	comments?: Comment[]
	loading: boolean
}

export const CommentList: React.FC<CommentListProps> = ({ comments, loading }) => {
	return (
		<div className='flex-y-4'>
			{loading
				? Array.from({ length: SITE.ALBUM.COMMENT_LIMIT }).map((_, index) => (
						<CommentSkeleton key={index} />
				  ))
				: comments?.map((comment, index) => (
						<CommentCard key={comment.commentId + index} comment={comment} />
				  ))}
		</div>
	)
}
