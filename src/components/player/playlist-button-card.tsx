import { CirclePlay, Music2 } from 'lucide-react'

import { useAudioPlayer } from '@/store/audio-player'
import { cn, formatDuration, thumbnail } from '@/lib/utils'
import { Track } from '@/types/playlist'

type PlaylistButtonCardProps = {
	playlist: Track
	index: number
}

export const PlaylistButtonCard = ({ playlist, index }: PlaylistButtonCardProps) => {
	const playTrack = useAudioPlayer(state => state.playTrack)
	const isPlaying = useAudioPlayer(state => state.isPlaying)
	const currentTrackIndex = useAudioPlayer(state => state.currentTrackIndex)

	if (!playlist) return null

	const handlePlayTrack = () => {
		playTrack(index)
	}

	return (
		<section
			className={cn(
				'group grid grid-cols-[auto,1fr,3rem] gap-x-2 items-center p-2 text-sm text-primary/50 bg-blue-500/0 rounded-lg trans-all hover:bg-blue-100',
				{
					'bg-blue-100': currentTrackIndex === index
				}
			)}
		>
			<div className='relative size-12 rounded-lg overflow-hidden'>
				{/* Overlay */}
				<div
					className={cn(
						'absolute z-10 inset-0 flex-center size-full bg-transparent trans-all opacity-0',
						{
							'bg-blue-950/60 opacity-100': isPlaying && currentTrackIndex === index
						}
					)}
				>
					<Music2
						className={cn('size-5 text-white', {
							'animate-bounce': isPlaying && currentTrackIndex === index
						})}
					/>
				</div>

				{/* Cover */}
				<img src={thumbnail(playlist.al.picUrl || '', 48)} />
			</div>

			<div className='flex-y-1'>
				<h2 className='text-primary/80 font-medium line-clamp-1'>{playlist.name}</h2>
				<div className='text-xs text-primary/50'>{playlist.ar.map(a => a.name).join(' / ')}</div>
			</div>

			<div className='flex-end'>
				<button
					onClick={handlePlayTrack}
					disabled={currentTrackIndex === index}
					className='flex-center size-10 text-primary/50 cursor-pointer trans-all opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 hover:text-blue-500 disabled:text-primary/20'
				>
					<CirclePlay className='size-5' />
				</button>

				<span className='trans-all opacity-100 translate-x-0 group-hover:translate-x-4 group-hover:opacity-0'>
					{formatDuration(playlist.dt)}
				</span>
			</div>
		</section>
	)
}
