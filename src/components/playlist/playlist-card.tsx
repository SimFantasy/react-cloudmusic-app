import React from 'react'
import { Link } from 'react-router'
import { Headphones, Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { formatCount, thumbnail } from '@/lib/utils'
import { PlaylistResult } from '@/types/discover'
import { PlaylistDetail } from '@/types/playlist'

type PlaylistCardProps = {
	playlist: PlaylistResult | PlaylistDetail
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
	if (!playlist) return null

	return (
		<Link to={`/playlist/${playlist.id}`} className='group flex-y-2 w-full'>
			<AspectRatio ratio={1} className='relative w-full rounded-lg overflow-hidden'>
				{/* Play button */}
				<button
					className='absolute right-4 bottom-4 z-20 flex-center size-10 rounded-full bg-sky-500/80 backdrop-blur-sm trans-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
					title='播放'
				>
					<Play className='size-5 fill-white stroke-white' />
				</button>

				{/* Overlay */}
				<div className='absolute inset-0 z-10 p-2 bg-blue-950/0 trans-colors group-hover:bg-blue-950/40'>
					{/* Play count */}
					<div className='flex-x-1 px-2 py-1 w-fit text-xs text-white bg-blue-950/60 backdrop-blur-sm rounded-full trans-all opacity-100 translate-y-0 group-hover:translate-y-4 group-hover:opacity-0'>
						<Headphones className='size-3' />
						{formatCount(playlist.playCount)}
					</div>
				</div>

				{/* Image */}
				<img
					src={thumbnail(
						(playlist as PlaylistDetail).coverImgUrl || (playlist as PlaylistResult).picUrl,
						240
					)}
					alt={playlist.name}
					className='size-full object-cover trans-transform scale-100 group-hover:scale-110'
				/>
			</AspectRatio>
			<h2 className='text-sm text-primary/50 line-clamp-2 trans-colors group-hover:text-blue-500'>
				{playlist.name}
			</h2>
		</Link>
	)
}
