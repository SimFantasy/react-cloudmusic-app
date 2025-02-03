import { ListPlus, Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/common/user-avatar'

import { formatDate, thumbnail } from '@/lib/utils'
import { PlaylistDetail } from '@/types/playlist'

type DetailTopbarProps = {
	detail?: PlaylistDetail
	loading: boolean
}

export const DetailTopbar = ({ detail, loading }: DetailTopbarProps) => {
	return (
		<>
			{loading ? (
				// Loading skeleton
				<div className='grid grid-cols-[auto,1fr] gap-4'>
					<section className='w-52 h-44'>
						<Skeleton className='size-44 rounded-lg' />
					</section>

					<section className='flex-y-4 justify-between'>
						<div className='flex-y-2'>
							<Skeleton className='w-1/4 h-6 rounded-full' />
							<Skeleton className='w-1/2 h-4 rounded-full' />
							<div className='flex-x-4 mt-4'>
								<Skeleton className='w-40 h-4 rounded-full' />
								<Skeleton className='w-40 h-4 rounded-full' />
							</div>
						</div>

						<div className='flex-x-4'>
							<Skeleton className='w-24 h-10 rounded-lg' />
							<Skeleton className='w-48 h-10 rounded-lg' />
						</div>
					</section>
				</div>
			) : (
				<div className='grid grid-cols-[auto,1fr] gap-4'>
					{/* Cover image */}
					<section className='w-52 h-44'>
						<AspectRatio ratio={1} className='relative size-44 rounded-lg'>
							<img
								src={thumbnail(detail?.coverImgUrl || '', 400)}
								alt={detail?.name || ''}
								className='size-full object-cover rounded-lg'
							/>
						</AspectRatio>
					</section>

					{/* Playlist details */}
					<section className='flex-y-4 justify-between'>
						<div className='flex-y-2 text-sm tetx-primary/50'>
							<h1 className='text-xl font-medium text-primary/80 line-clamp-1 truncate'>
								{detail?.name}
							</h1>
							<div className='line-clamp-3'>{detail?.description}</div>
							<div className='flex-x-4 mt-4 text-xs'>
								{/* Createor */}
								<div className='flex-x-2'>
									<UserAvatar
										image={thumbnail(detail?.creator.avatarUrl || '', 48)}
										name={detail?.creator.nickname}
									/>
									<span>{detail?.creator.nickname}</span>
								</div>

								<div>标签：{detail?.tags.join(' / ')}</div>

								<div className='text-primary/40'>
									{formatDate(detail?.createTime || '', 'YYYY-MM-DD')} 创建
								</div>
							</div>
						</div>

						<div className='flex-x-4'>
							<Button className='play-all-button'>
								<Play className='size-5 fill-white stroke-white' />
								<span>播放全部</span>
							</Button>

							<Button variant='outline' className='button-free px-4 py-2 text-primary/50'>
								<ListPlus className='size-5' />
								<span>全部添加到播放列表</span>
							</Button>
						</div>
					</section>
				</div>
			)}
		</>
	)
}
