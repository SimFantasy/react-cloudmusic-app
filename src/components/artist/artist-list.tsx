import { ArtistCard } from '@/components/artist/artist-card'
import { ArtistSkeleton } from '@/components/artist/artist-skeleton'
import { Artist } from '@/types/artist'

type ArtistListProps = {
	artists?: Artist[]
	loading: boolean
}

export const ArtistList: React.FC<ArtistListProps> = ({ artists, loading }) => {
	return (
		<div className='grid grid-cols-4 gap-4 xl:grid-cols-6'>
			{loading
				? Array.from({ length: 24 }).map((_, index) => <ArtistSkeleton key={index} />)
				: artists?.map((artist, index) => <ArtistCard key={artist.id + index} artist={artist} />)}
		</div>
	)
}
