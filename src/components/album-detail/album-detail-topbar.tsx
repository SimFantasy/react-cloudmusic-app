import React from 'react'
import { ListPlus, Play } from 'lucide-react'

import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { UserAvatar } from '@/components/common/user-avatar'
import { PlaylistButton } from '@/components/common/playlist-button'

import { formatDate, thumbnail } from '@/lib/utils'
import { AlbumDetail } from '@/types/album'
import { Track } from '@/types/playlist'

type AlbumDetailTopbarProps = {
	detail?: AlbumDetail
	loading: boolean
}

export const AlbumDetailTopbar: React.FC<AlbumDetailTopbarProps> = ({ detail, loading }) => {
	console.log('detail', detail)
	const songs = detail?.songs.map(song => ({
		...song,
		al: { picUrl: detail?.album.picUrl }
	})) as Track[]
	return (
		<>
			{loading ? (
				<div>Loading</div>
			) : (
				<div className='grid grid-cols-[auto,1fr] gap-4'>
					<div className='grid grid-cols-[auto,1fr] gap-4'>
						{/* Cover image */}
						<section className='w-52 h-44'>
							<AspectRatio ratio={1} className='relative size-44 rounded-lg'>
								<img
									src={thumbnail(detail?.album.picUrl || '', 400)}
									alt={detail?.album.name || ''}
									className='size-full object-cover rounded-lg'
								/>
							</AspectRatio>
						</section>

						{/* Playlist details */}
						<section className='flex-y-4 justify-between'>
							<div className='flex-y-2 text-sm tetx-primary/50'>
								<h1 className='text-xl font-medium text-primary/80 line-clamp-1 truncate'>
									{detail?.album.name}
								</h1>

								<div className='flex-x-4 mt-4 text-xs'>
									{/* Createor */}
									<div className='flex-x-2'>
										<UserAvatar
											image={thumbnail(detail?.album.artist?.picUrl || '', 48)}
											name={detail?.album.artist?.name}
										/>
										<span>{detail?.album.artist?.name}</span>
									</div>

									<div className='text-primary/40'>
										{formatDate(detail?.album.publishTime || '', 'YYYY-MM-DD')} 创建
									</div>
								</div>
							</div>

							<div className='flex-x-4'>
								<PlaylistButton className='play-all-button' type='set' tracks={songs}>
									<Play className='size-5 fill-white stroke-white' />
									<span>播放全部</span>
								</PlaylistButton>

								<PlaylistButton
									variant='outline'
									className='button-free px-4 py-2 text-primary/50'
									type='add'
									tracks={songs}
								>
									<ListPlus className='size-5' />
									<span>全部添加到播放列表</span>
								</PlaylistButton>
							</div>
						</section>
					</div>
				</div>
			)}
		</>
	)
}
