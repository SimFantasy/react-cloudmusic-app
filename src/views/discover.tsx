import React from 'react'

import { Titlebar } from '@/components/common/titlebar'
import { PlaylistList } from '@/components/playlist/playlist-list'
import { SonglistList } from '@/components/songlist/songlist-list'

import { useDiscoverPlaylist, useDiscoverNewSong } from '@/service/queries/discover'
import { ROUTES } from '@/config'

const Discover: React.FC = () => {
	const { data: playlists, loading: playlistsLoading } = useDiscoverPlaylist()
	const { data: newSongs, loading: newSongsLoading } = useDiscoverNewSong()

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<Titlebar title='发现音乐' link={ROUTES.PLAYLIST} />
				<PlaylistList playlists={playlists} loading={playlistsLoading} />
			</div>

			<div className='page-block'>
				<Titlebar title='新歌速递' link={ROUTES.NEWSONG} />
				<SonglistList songs={newSongs} loading={newSongsLoading} />
			</div>
		</div>
	)
}

export default Discover
