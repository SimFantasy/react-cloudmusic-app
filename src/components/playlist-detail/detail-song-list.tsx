import { DetailSongCard } from '@/components/playlist-detail/detail-song-card'
import { DetailSongSkeleton } from '@/components/playlist-detail/detail-song-skeleton'
import { Daum } from '@/types/newsong'
import { Track } from '@/types/playlist'

type DetailSongListProps = {
	songs?: Track[] | Daum[]
	loading: boolean
}

export const DetailSongList: React.FC<DetailSongListProps> = ({ songs, loading }) => {
	return (
		<div className='flex-y-1'>
			{loading
				? Array.from({ length: 10 }).map((_, index) => <DetailSongSkeleton key={index} />)
				: songs?.map((song, index) => (
						<DetailSongCard
							key={song.id + ((song as Track).dt || (song as Daum).duration) + index}
							song={song}
							index={index}
						/>
				  ))}
		</div>
	)
}
