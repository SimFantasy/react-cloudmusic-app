import React from 'react'
import { Link } from 'react-router'
import { CirclePlay, Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { formatCount, thumbnail } from '@/lib/utils'
import { Mv } from '@/types/artist'
import { SearchMv } from '@/types/search'

type MvCardProps = {
	mv: Mv | SearchMv
}

export const MvCard: React.FC<MvCardProps> = ({ mv }) => {
	if (!mv) return null
	return (
		<Link to={`/mv/${mv.id}`} className='group flex-y-2 w-full cursor-pointer'>
			<AspectRatio ratio={16 / 9} className='relative w-full rounded-lg overflow-hidden'>
				{/* Overlay */}
				<div className='absolute z-10 inset-0 flex-y-1 justify-between size-full bg-blue-950/0 trans-colors group-hover:bg-blue-950/40'>
					{/* Play count */}
					<div className='flex-end gap-x-1 px-4 py-2 bg-gradient-to-b from-black/20 to-black/0 text-sm text-white'>
						<CirclePlay className='size-4' />
						<span>{formatCount(mv.playCount)}</span>
					</div>
					{/* Play button */}
					<button
						className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 translate-y-0
          size-10 trans-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2'
					>
						<Play className='size-10 fill-white stroke-white' />
					</button>
				</div>

				{/* Cover */}
				<img
					src={thumbnail((mv as Mv).imgurl || (mv as SearchMv).cover, 480, 480)}
					alt={mv.name}
					className='size-full object-cover'
				/>
			</AspectRatio>
			<h2 className='text-center text-sm text-primary/80 line-clamp-1 group-hover:text-blue-500'>
				{mv.name}
			</h2>
		</Link>
	)
}
