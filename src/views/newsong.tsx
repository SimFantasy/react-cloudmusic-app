import useUrlState from '@ahooksjs/use-url-state'
import { Play } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { NewsongCategories } from '@/components/newsong/newsong-categories'

import { useNewSongs } from '@/service/queries/newsong'
import { DetailSongList } from '@/components/playlist-detail/detail-song-list'

const NewSong: React.FC = () => {
	const [urlState, setUrlState] = useUrlState<{ type?: string }>(undefined)

	const { data, loading } = useNewSongs({ type: urlState?.type })

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				{/* Topbar */}
				<section className='flex-x-4 justify-between'>
					<NewsongCategories urlState={urlState} setUrlState={setUrlState} />

					<div className='hidden justify-end items-center gap-x-4 lg:flex'>
						<Button className='play-all-button'>
							<Play className='size-5 fill-white stroke-white' />
							<span>播放全部</span>
						</Button>
					</div>
				</section>

				{/* List */}
				<DetailSongList songs={data} loading={loading} />
			</div>
		</div>
	)
}

export default NewSong
