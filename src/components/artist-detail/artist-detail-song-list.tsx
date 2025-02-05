import { DetailSongList } from '@/components/playlist-detail/detail-song-list'
import { useArtistTopSongs } from '@/service/queries/artist'

type ArtistDetailSongListProps = {
	artistId?: string
}

export const ArtistDetailSongList = ({ artistId }: ArtistDetailSongListProps) => {
	const { data, loading } = useArtistTopSongs({ id: Number(artistId) })
	return (
		<div className='flex-y-4'>
			<DetailSongList songs={data} loading={loading} />
		</div>
	)
}
