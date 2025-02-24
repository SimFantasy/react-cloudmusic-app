import React from 'react'

import { Link } from 'react-router'
import { Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { formatDate, thumbnail } from '@/lib/utils'
import { Album } from '@/types/album'
import { Album as AlbumType } from '@/types/playlist'

type AlbumCardProps = {
	album: Album | AlbumType
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
	if (!album) return null
	return (
		<Link to={`/album/${album.id}`} className='group flex-y-2 w-full'>
			<AspectRatio ratio={1} className='relative w-full rounded-lg overflow-hidden'>
				{/* Overlay */}
				<div className='absolute z-10 inset-0 size-full bg-blue-950/0 trans-all group-hover:bg-blue-950/60'>
					{/* Play button */}
					<button className='absolute right-4 bottom-4 z-20 flex-center size-10 bg-white rounded-full trans-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
						<Play className='size-5 fill-blue-500 stroke-blue-500' />
					</button>
				</div>

				{/* Cover */}
				<img
					src={thumbnail(album.picUrl || '', 320)}
					alt={album.name}
					className='size-full object-cover'
				/>
			</AspectRatio>
			<div className='flex-y-1'>
				<h1 className='text-sm text-primary/80 line-clamp-1 truncate group-hover:text-blue-500'>
					{album.name}
				</h1>
				<div className='flex-x-4 text-xs text-primary/50 group-hover:text-blue-400'>
					{(album as Album).size && <span>{(album as Album).size}首</span>}
					{(album as Album).publishTime && (
						<span>{formatDate((album as Album).publishTime, 'YYYY-MM-DD')}</span>
					)}
				</div>
			</div>
		</Link>
	)
}
