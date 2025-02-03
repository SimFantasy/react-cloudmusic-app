import { AlbumCard } from '@/components/album/album-card'
import { AlbumSkeleton } from '@/components/album/album-skeleton'
import { SITE } from '@/config'
import { Album } from '@/types/artist'

type AlbumListProps = {
	albums?: Album[]
	loading: boolean
}

export const AlbumList = ({ albums, loading }: AlbumListProps) => {
	return (
		<div className='grid grid-cols-4 gap-4 xl:grid-cols-6'>
			{loading
				? Array.from({ length: SITE.ARTIST.ALBUM_LIMIT }).map((_, index) => (
						<AlbumSkeleton key={index} />
				  ))
				: albums?.map(album => <AlbumCard key={album.id} album={album} />)}
		</div>
	)
}
