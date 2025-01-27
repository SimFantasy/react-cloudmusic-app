import { useDiscoverPlaylist, useDiscoverNewSong } from '@/service/queries/discover'

const Discover = () => {
	const { data: playlists, loading: playlistsLoading } = useDiscoverPlaylist()
	const { data: newSongs, loading: newSongsLoading } = useDiscoverNewSong()

	if (playlistsLoading || newSongsLoading) return <div>Loading...</div>

	console.log('playlists data', playlists)
	console.log('newSongs data', newSongs)
	return <div>Discover</div>
}

export default Discover
