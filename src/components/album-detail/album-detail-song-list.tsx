import { Song } from '@/types/playlist'
import { AlbumDetailSongCard } from '@/components/album-detail/album-detail-song-card'
import { AlbumDetailSongSkeleton } from '@/components/album-detail/album-detail-song-skeleton'
import { SITE } from '@/config'

type AlbumDetailSongListProps = {
	songs?: Song[]
	loading: boolean
}

export const AlbumDetailSongList = ({ songs, loading }: AlbumDetailSongListProps) => {
	return (
		<div className='flex-y-1'>
			{loading
				? Array.from({ length: SITE.ALBUM.SONG_LIMIT }).map((_, index) => (
						<AlbumDetailSongSkeleton key={index} />
				  ))
				: songs?.map((song, index) => (
						<AlbumDetailSongCard key={song.id} song={song} index={index} />
				  ))}
		</div>
	)
}
