import { Comment } from '@/types/comment'
import { UserAvatar } from '@/components/common/user-avatar'
import { formatDate } from '@/lib/utils'
import { MessageCircleMore, MessageSquareShare, ThumbsUp } from 'lucide-react'

type CommentCardProps = {
	comment: Comment
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
	return (
		<div className='grid grid-cols-[auto,1fr] gap-4 items-start pb-4 w-full border-b border-primary/5'>
			<UserAvatar image={comment.user.avatarUrl} name={comment.user.nickname} size='lg' />

			<div className='flex flex-col'>
				<h1 className='flex-x-2'>
					<span className='text-primary/80 text-sm'>{comment.user.nickname}</span>
					{comment.user.userType > 0 && (
						<img
							src={comment.user.vipRights?.associator?.iconUrl}
							alt={'VIP Level' + comment.user.userType.toString()}
							className='w-fit h-4 object-cover'
						/>
					)}
				</h1>
				<div className='text-primary/80 text-sm'>{comment.content}</div>
				<div className='flex-x-4 justify-between text-xs pt-2'>
					<span className='text-primary/40'>{formatDate(comment.time)}</span>

					<div className='flex-end gap-x-4'>
						<button className='flex-x-2 text-xs text-primary/50'>
							<span>{comment.likedCount}</span>
							<ThumbsUp className='size-4' />
						</button>

						<button className='text-xs text-primary/50'>
							<MessageSquareShare className='size-4' />
						</button>

						<button className='text-xs text-primary/50'>
							<MessageCircleMore className='size-4' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
