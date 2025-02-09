import React from 'react'
import { Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { Skeleton } from '@/components/ui/skeleton'

import { thumbnail } from '@/lib/utils'
import { Artist } from '@/types/artist'
import { Song } from '@/types/playlist'
import { PlaylistButton } from '../common/playlist-button'

type ArtistDetailTopbarProps = {
	artist?: Artist
	loading: boolean
	songs?: Song[]
}

export const ArtistDetailTopbar: React.FC<ArtistDetailTopbarProps> = ({
	artist,
	loading,
	songs
}) => {
	return (
		<>
			{loading ? (
				<div className='grid grid-cols-[13rem,1fr]'>
					<div className='w-52 h-44'>
						<Skeleton className='size-44 rounded-full' />
					</div>
					<div className='flex-y-4 justify-between'>
						<div className='flex-y-2'>
							<Skeleton className='w-40 h-4 rounded-lg' />
							<Skeleton className='w-24 h-4 rounded-lg' />
						</div>
						<div className='flex-x-4'>
							<Skeleton className='w-24 h-10 rounded-lg' />
							<Skeleton className='w-20 h-10 rounded-lg' />
						</div>
					</div>
				</div>
			) : (
				<div className='grid grid-cols-[13rem,1fr]'>
					<div className='w-52 h-44'>
						<AspectRatio ratio={1} className='size-44 rounded-full overflow-hidden'>
							<img
								src={thumbnail(artist?.cover || '', 240)}
								alt={artist?.name}
								className='size-full object-cover'
							/>
						</AspectRatio>
					</div>
					<div className='flex-y-4 justify-between'>
						<div className='flex-y-2'>
							<h1 className='text-xl text-primary/80 font-semibold'>{artist?.name}</h1>
							<div className='text-sm text-primary/50'>{artist?.alias.join(' / ')}</div>
						</div>

						<div className='flex-x-4'>
							<PlaylistButton className='play-all-button' type='set' tracks={songs}>
								<Play className='size-5 fill-white stroke-white' />
								<span>播放全部</span>
							</PlaylistButton>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
