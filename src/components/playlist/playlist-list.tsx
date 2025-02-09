import React from 'react'

import { PlaylistCard } from '@/components/playlist/playlist-card'
import { PlaylistSkeleton } from '@/components/playlist/playlist-skeleton'

import { SITE } from '@/config'
import { PlaylistResult } from '@/types/discover'
import { PlaylistDetail } from '@/types/playlist'

type PlaylistListProps = {
	playlists?: PlaylistResult[] | PlaylistDetail[]
	loading: boolean
}

export const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, loading }) => {
	return (
		<div className='grid grid-cols-4 xl:grid-cols-6 gap-4'>
			{loading
				? Array.from({ length: SITE.DISCOVER.PLAYLIST_LIMIT }).map((_, i) => (
						<PlaylistSkeleton key={i} />
				  ))
				: playlists?.map((playlist, index) => (
						<PlaylistCard key={playlist.id + index} playlist={playlist} />
				  ))}
		</div>
	)
}
