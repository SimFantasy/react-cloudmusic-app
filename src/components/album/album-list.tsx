import { AlbumCard } from '@/components/album/album-card'
import { AlbumSkeleton } from '@/components/album/album-skeleton'
import { SITE } from '@/config'

import { Album } from '@/types/album'

type AlbumListProps = {
	albums?: Album[]
	loading: boolean
}

export const AlbumList: React.FC<AlbumListProps> = ({ albums, loading }) => {
	return (
		<div className='grid grid-cols-4 gap-4 xl:grid-cols-6'>
			{loading
				? Array.from({ length: SITE.ARTIST.ALBUM_LIMIT }).map((_, index) => (
						<AlbumSkeleton key={index} />
				  ))
				: albums?.map((album, index) => <AlbumCard key={album.id! + index} album={album} />)}
		</div>
	)
}
