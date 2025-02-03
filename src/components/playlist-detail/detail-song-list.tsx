import { DetailSongCard } from '@/components/playlist-detail/detail-song-card'
import { DetailSongSkeleton } from '@/components/playlist-detail/detail-song-skeleton'
import { Track } from '@/types/playlist'

type DetailSongListProps = {
	songs?: Track[]
	loading: boolean
}

export const DetailSongList = ({ songs, loading }: DetailSongListProps) => {
	return (
		<div className='flex-y-1'>
			{loading
				? Array.from({ length: 10 }).map((_, index) => <DetailSongSkeleton key={index} />)
				: songs?.map((song, index) => (
						<DetailSongCard key={song.id + song.dt + index} song={song} index={index} />
				  ))}
		</div>
	)
}
