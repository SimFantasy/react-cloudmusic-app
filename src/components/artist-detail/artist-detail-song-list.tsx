import React from 'react'

import { DetailSongList } from '@/components/playlist-detail/detail-song-list'

import { Song } from '@/types/playlist'

type ArtistDetailSongListProps = {
	artistId?: string
	songs?: Song[]
	loading: boolean
}

export const ArtistDetailSongList: React.FC<ArtistDetailSongListProps> = ({ songs, loading }) => {
	return (
		<div className='flex-y-4'>
			<DetailSongList songs={songs} loading={loading} />
		</div>
	)
}
