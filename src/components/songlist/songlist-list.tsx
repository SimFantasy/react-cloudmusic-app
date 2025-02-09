import React from 'react'

import { SonglistCard } from '@/components/songlist/songlist-card'
import { SongListSkeleton } from '@/components/songlist/songlist-skeleton'

import { SITE } from '@/config'
import { NewSongResult } from '@/types/discover'
import { Song } from '@/types/playlist'

type SonglistListProps = {
	songs?: NewSongResult[] | Song[]
	loading: boolean
}

export const SonglistList: React.FC<SonglistListProps> = ({ songs, loading }) => {
	return (
		<div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
			{loading
				? Array.from({ length: SITE.DISCOVER.NEWSONG_LIMIT }).map((_, i) => (
						<SongListSkeleton key={i} />
				  ))
				: songs?.map(song => (
						<SonglistCard key={song.id} song={(song as NewSongResult).song || (song as Song)} />
				  ))}
		</div>
	)
}
