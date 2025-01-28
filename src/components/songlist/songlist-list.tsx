import { SonglistCard } from '@/components/songlist/songlist-card'
import { SongListSkeleton } from '@/components/songlist/songlist-skeleton'

import { SITE } from '@/config'

import { NewSongResult } from '@/types/discover'

type SonglistListProps = {
	songs?: NewSongResult[]
	loading: boolean
}

export const SonglistList = ({ songs, loading }: SonglistListProps) => {
	return (
		<div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
			{loading
				? Array.from({ length: SITE.DISCOVER.NEWSONG_LIMIT }).map((_, i) => (
						<SongListSkeleton key={i} />
				  ))
				: songs?.map(song => <SonglistCard key={song.id} song={song} />)}
		</div>
	)
}
