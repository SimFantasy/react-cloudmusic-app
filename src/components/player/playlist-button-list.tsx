import React from 'react'

import { PlaylistButtonCard } from '@/components/player/playlist-button-card'
import { Track } from '@/types/playlist'

type PlaylistButtonListProps = {
	playlists?: Track[]
}

export const PlaylistButtonList: React.FC<PlaylistButtonListProps> = ({ playlists }) => {
	return (
		<div className='flex-y-1'>
			{playlists?.map((playlist, index) => (
				<PlaylistButtonCard key={playlist.id} playlist={playlist} index={index} />
			))}
		</div>
	)
}
