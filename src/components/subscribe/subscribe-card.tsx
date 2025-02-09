import { PlaylistSubscriber } from '@/types/playlist'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { thumbnail } from '@/lib/utils'

type SubscribeCardProps = {
	subscribe: PlaylistSubscriber
}

export const SubscribeCard: React.FC<SubscribeCardProps> = ({ subscribe }) => {
	return (
		<div className='group flex-y-2 p-4 w-full text-center bg-card/0 rounded-lg trans-all cursor-pointer hover:bg-blue-500/10'>
			<div className='w-full'>
				<AspectRatio
					ratio={1}
					className='w-full rounded-full overflow-hidden border-4 border-blue-500/0 trans-all group-hover:border-blue-500/30'
				>
					<img
						src={thumbnail(subscribe.avatarUrl, 320)}
						alt={subscribe.nickname}
						className='size-full object-cover'
					/>
				</AspectRatio>
			</div>
			<h1 className='text-base text-primary/80 line-clamp-1 trans-colors group-hover:text-blue-500'>
				{subscribe.nickname}
			</h1>
			<div className='text-xs text-primary/50 line-clamp-1 trans-colors group-hover:text-blue-500/40'>
				{subscribe.signature || '暂无签名'}
			</div>
		</div>
	)
}
