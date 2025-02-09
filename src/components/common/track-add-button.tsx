import React from 'react'
import { ListPlus } from 'lucide-react'
import { useAudioPlayer } from '@/store/audio-player'
import { Track, Song } from '@/types/playlist'

type TrackAddButtonProps = {
	track: Track | Song
	pos?: 'next' | 'end'
}

export const TrackAddButton: React.FC<TrackAddButtonProps> = ({ track, pos = 'end' }) => {
	const addTracktoPlaylist = useAudioPlayer(state => state.addTrackToPlaylist)
	return (
		<button
			onClick={() => addTracktoPlaylist(track, pos)}
			className='p-2 bg-transparent border-none outline-none trans-all opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
			title={pos === 'next' ? '下首播放' : '添加到播放列表'}
		>
			<ListPlus className='size-5 text-primary/50 hover:text-blue-500' />
		</button>
	)
}
