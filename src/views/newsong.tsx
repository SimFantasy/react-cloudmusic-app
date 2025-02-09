import React from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import { Play } from 'lucide-react'

import { NewsongCategories } from '@/components/newsong/newsong-categories'
import { DetailSongList } from '@/components/playlist-detail/detail-song-list'
import { PlaylistButton } from '@/components/common/playlist-button'

import { useNewSongs } from '@/service/queries/newsong'
import { formatDaumsToTracks } from '@/lib/format-data'

const NewSong: React.FC = () => {
	const [urlState, setUrlState] = useUrlState<{ type?: string }>(undefined)

	const { data, loading } = useNewSongs({ type: urlState?.type })

	const tracks = formatDaumsToTracks(data)

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				{/* Topbar */}
				<section className='flex-x-4 justify-between'>
					<NewsongCategories urlState={urlState} setUrlState={setUrlState} />

					<div className='hidden justify-end items-center gap-x-4 lg:flex'>
						<PlaylistButton className='play-all-button' type='set' tracks={tracks}>
							<Play className='size-5 fill-white stroke-white' />
							<span>播放全部</span>
						</PlaylistButton>
					</div>
				</section>

				{/* List */}
				<DetailSongList songs={data} loading={loading} />
			</div>
		</div>
	)
}

export default NewSong
