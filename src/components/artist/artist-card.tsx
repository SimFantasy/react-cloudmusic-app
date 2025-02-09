import { Play } from 'lucide-react'
import { Link } from 'react-router'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { thumbnail } from '@/lib/utils'
import { Artist } from '@/types/artist'

type ArtistCardProps = {
	artist: Artist
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
	return (
		<Link
			to={`/artist/${artist.id}`}
			className='group flex-y-2 items-center p-6 w-full rounded-lg bg-transparent trans-all backdrop-blur-sm cursor-pointer hover:bg-card/95 hover:shadow-lg'
		>
			<div className='w-full'>
				<AspectRatio ratio={1} className='relative size-full'>
					{/* Overlay */}
					<div className='absolute z-10 inset-0 flex-center size-full bg-blue-950/0 rounded-full group-hover:bg-blue-950/60'>
						<Play className='size-6 fill-white stroke-white trans-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0' />
					</div>

					{/* Artist image */}
					<img
						src={thumbnail(artist.picUrl, 240)}
						alt={artist.name}
						className='size-full object-cover rounded-full'
					/>
				</AspectRatio>
			</div>
			<div className='flex-y-1 text-center'>
				<h2 className='text-sm text-primary/80'>{artist.name}</h2>
				<div className='text-xs text-primary/50'>单曲： {artist.musicSize}</div>
			</div>
		</Link>
	)
}
