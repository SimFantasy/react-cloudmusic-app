import React from 'react'
import { Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { TrackAddButton } from '@/components/common/track-add-button'
import { TrackPlayButton } from '@/components/common/track-play-button'

import { cn, formatDuration, thumbnail } from '@/lib/utils'
import { formatDaumToTrack, formatNewSongToTrack } from '@/lib/format-data'
import { Track } from '@/types/playlist'
import { Daum } from '@/types/newsong'
import { NewSong } from '@/types/discover'

type DetailSongCardProps = {
	song: Track | Daum | NewSong
	index: number
}

export const DetailSongCard: React.FC<DetailSongCardProps> = ({ song, index }) => {
	const songPic =
		(song as Track)?.al?.picUrl || (song as Daum)?.album?.picUrl || (song as NewSong).album.picUrl
	const songName = (song as Track)?.name || (song as Daum)?.name
	const trackName = (song as Track)?.al?.name || (song as Daum)?.album?.name

	const daum = formatDaumToTrack(song as Daum)
	const newsong = formatNewSongToTrack(song as NewSong)

	const track = (song as Track) || (daum as Track) || (newsong as Track)

	return (
		<section
			className={cn(
				'group grid grid-cols-[auto,auto,1fr,1fr,0.5fr,auto] gap-1 items-center p-2 rounded-lg text-sm text-primary/50 trans-all bg-transparent hover:bg-blue-500/15',
				index % 2 === 0 && 'bg-blue-500/5'
			)}
		>
			<div className='w-8'>{index < 9 ? `0${index + 1}` : index + 1}</div>
			<div className='size-12'>
				<AspectRatio ratio={1} className='relative w-full rounded-lg overflow-hidden'>
					{/* Overlay */}
					<div className='absolute top-0 left-0 z-10 flex-center size-full bg-transparent trans-all group-hover:bg-blue-950/60'>
						<Play className='size-5 fill-white stroke-white trans-all opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' />
					</div>

					{/* Cover image */}
					<img src={thumbnail(songPic || '', 64)} alt={songName} className='size-12 object-cover' />
				</AspectRatio>
			</div>
			<div className='flex-y-1 px-2'>
				<h1 className='text-sm text-primary/80 group-hover:text-blue-500'>{songName}</h1>
				<div className='text-xs text-primary/40'>
					{((song as Track).ar || (song as Daum).artists)?.map(artist => artist.name).join(' / ')}
				</div>
			</div>
			<div className='text-primary/60 truncate line-clamp-1'>{trackName}</div>
			<div>{formatDuration((song as Track).dt || (song as Daum).duration)}</div>
			<div className='flex-end gap-x-2'>
				<TrackAddButton track={track} pos='end' />
				<TrackPlayButton track={track} />
			</div>
		</section>
	)
}
