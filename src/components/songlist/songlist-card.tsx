import React from 'react'
import { Play } from 'lucide-react'

import { TrackPlayButton } from '@/components/common/track-play-button'
import { TrackAddButton } from '@/components/common/track-add-button'

import { thumbnail } from '@/lib/utils'
import { formatNewSongToTrack } from '@/lib/format-data'
import { NewSong } from '@/types/discover'
import { Song } from '@/types/playlist'

type SonglistCardProps = {
	song: NewSong | Song
}

export const SonglistCard: React.FC<SonglistCardProps> = ({ song }) => {
	if (!song) return null
	const newsong = formatNewSongToTrack(song as NewSong)

	let track
	if ('album' in song) {
		track = newsong
	} else {
		track = song as Song
	}

	return (
		<section className='group grid grid-cols-[auto,1fr,auto] gap-2 items-center p-2 h-16 bg-transparent rounded-lg trans-colors hover:bg-blue-500/10'>
			<div className='relative size-12 rounded-lg overflow-hidden cursor-pointer'>
				{/* Overlay */}
				<div
					className='absolute inset-0 z-20 flex-center size-full bg-transparent trans-all group-hover:bg-blue-950/60'
					title='播放歌曲'
				>
					<Play className='size-5 fill-white stroke-white trans-all opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' />
				</div>

				{/* Image */}
				<img
					src={thumbnail(track.al.picUrl || '', 120)}
					alt={song.name}
					className='size-full object-cover'
				/>
			</div>

			<div className='flex-y-1'>
				<h3 className='text-base font-medium text-primary/80 truncate trans-all group-hover:text-blue-500'>
					{song.name}
				</h3>
				<span className='text-xs text-primary/40 trans-colors group-hover:text-blue-500/60'>
					{track.ar?.map(artist => artist.name).join(' / ')}
				</span>
			</div>

			<div className='flex-end gap-x-2'>
				<TrackAddButton track={track} />
				<TrackPlayButton track={track} />
			</div>
		</section>
	)
}
