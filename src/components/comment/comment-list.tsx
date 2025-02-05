import { Comment } from '@/types/comment'
import { CommentCard } from '@/components/comment/comment-card'
import { CommentSkeleton } from '@/components/comment/comment-skeleton'
import { SITE } from '@/config'

type CommentListProps = {
	comments?: Comment[]
	loading: boolean
}

export const CommentList = ({ comments, loading }: CommentListProps) => {
	return (
		<div className='flex-y-4'>
			{loading
				? Array.from({ length: SITE.ALBUM.COMMENT_LIMIT }).map((_, index) => (
						<CommentSkeleton key={index} />
				  ))
				: comments?.map(comment => <CommentCard key={comment.commentId} comment={comment} />)}
		</div>
	)
}
