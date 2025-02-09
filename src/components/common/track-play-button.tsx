import React from 'react'
import { CirclePlay } from 'lucide-react'
import { useAudioPlayer } from '@/store/audio-player'
import { Track, Song } from '@/types/playlist'

type TrackPlayButtonProps = {
	track: Track | Song
}

export const TrackPlayButton: React.FC<TrackPlayButtonProps> = ({ track }) => {
	const addTrack = useAudioPlayer(state => state.addTrack)
	return (
		<button
			onClick={() => addTrack(track)}
			className='p-2 bg-transparent border-none outline-none trans-all opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
			title='播放歌曲'
		>
			<CirclePlay className='size-5 text-primary/50 hover:text-blue-500' />
		</button>
	)
}
