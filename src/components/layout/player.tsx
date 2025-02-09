import { useRef, useEffect } from 'react'
import Plyr from 'plyr'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'

import { Slider } from '@/components/ui/slider'
import { PlaylistButton } from '@/components/player/playlist-button'

import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'

import { PlayerTrackInfo } from '../player/player-track-info'
import { VolumeButton } from '../player/volume-button'
import { PlaySequenceButton } from '../player/play-sequence-button'
import { PlaybackRateButton } from '../player/playback-rate-button'
import { SongLevelButton } from '../player/song-level-button'

export const Player: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const plyrRef = useRef<Plyr | null>(null)
	const initializedRef = useRef(false)

	const {
		init,
		currentTrack,
		duration,
		toggle,
		changeTrack,
		isPlaying,
		progress,
		isShowPlayer,
		setProgress,
		setCurrentTime,
		setIsShowPlayer
	} = useAudioPlayer()

	useEffect(() => {
		if (audioRef.current && !initializedRef.current) {
			const plyr = new Plyr('#audio-player', {
				controls: [],
				// debug: true,
				autoplay: false,
				clickToPlay: false,
				hideControls: false
			})

			init(plyr)

			return () => {
				plyr.destroy()
				plyrRef.current = null
				initializedRef.current = false
			}
		}
	}, [init])

	useEffect(() => {
		if (currentTrack || isShowPlayer) {
			setIsShowPlayer(true)
		}
	}, [currentTrack, setIsShowPlayer, isShowPlayer])

	const handleSeekCommit = (value: number[]) => {
		const newTime = (value[0] / 100) * duration
		setProgress(value[0])
		setCurrentTime(newTime)
		if (plyrRef.current) {
			plyrRef.current.currentTime = newTime
		}
	}

	const handleSeekChange = (value: number[]) => {
		const newTime = (value[0] / 100) * duration
		setProgress(value[0])
		setCurrentTime(newTime)
	}

	return (
		<footer
			className={cn(
				'fixed right-0 bottom-0 left-0 z-[1000] grid grid-rows-[auto_1fr] w-full h-20 bg-card/90 backdrop-blur-sm trans-all',
				{
					'opacity-0 translate-y-20': !isShowPlayer,
					'opacity-100 translate-y-0': isShowPlayer
				}
			)}
		>
			<Slider
				value={[progress]}
				max={100}
				step={0.1}
				onValueChange={handleSeekChange}
				onValueCommit={handleSeekCommit}
			/>

			<div className='grid grid-cols-[24rem,1fr,24rem] h-full px-4'>
				{/* Track info */}
				<PlayerTrackInfo />

				{/* Control buttons */}
				<section className='flex-center gap-x-4'>
					<PlaySequenceButton />

					<button className='player-btn' onClick={() => changeTrack('previous')}>
						<SkipBack className='player-icon-fill' />
					</button>

					<button className='player-play-btn' onClick={toggle}>
						{isPlaying ? <Pause className='play-icon' /> : <Play className='play-icon' />}
					</button>

					<button className='player-btn' onClick={() => changeTrack('next')}>
						<SkipForward className='player-icon-fill' />
					</button>

					<PlaybackRateButton />
				</section>

				{/* Options buttons */}
				<section className='flex-end gap-x-4'>
					{/* Song level */}
					<SongLevelButton />

					{/* Volume */}
					<VolumeButton />

					{/* Playlist button */}
					<PlaylistButton />
				</section>
			</div>
			<audio ref={audioRef} controls id='audio-player' />
		</footer>
	)
}
