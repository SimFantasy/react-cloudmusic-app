import { useSearchComplex } from '@/service/queries/search'
import { SearchCard } from '@/components/search/search-card'

import { Titlebar } from '@/components/common/titlebar'
import { SonglistList } from '@/components/songlist/songlist-list'
import { PlaylistList } from '@/components/playlist/playlist-list'
import { AlbumList } from '@/components/album/album-list'
import { MvList } from '@/components/mv/mv-list'
import { ArtistList } from '@/components/artist/artist-list'

import { SearchType } from '@/types/search'

import { thumbnail } from '@/lib/utils'

type SearchComplexProps = {
	query: string
	setCurrentTab: (tab: string) => void
}

export const SearchComplex = ({ query, setCurrentTab }: SearchComplexProps) => {
	const { data, loading } = useSearchComplex(query)
	const artist = data?.complex.artist.artists[0]
	const mv = data?.mvs[0]
	return (
		<div className='flex-y-4'>
			{/* Searc card */}
			<div className='grid grid-cols-2 gap-4'>
				<SearchCard
					link={`/artist/${artist?.id}`}
					image={thumbnail(artist?.picUrl || '', 100)}
					imageType='circle'
					title={'歌手：' + artist?.name || ''}
					info={[`专辑: ${artist?.albumSize}`, `MV: ${artist?.mvSize}`]}
					loading={loading}
				/>

				<SearchCard
					link={`/mv/${mv?.id}`}
					image={thumbnail(mv?.cover || '', 100)}
					imageType='square'
					title={'MV：' + mv?.name || ''}
					info={[`${mv?.artists[0].name}`, `播放：${mv?.playCount}`]}
					loading={loading}
				/>
			</div>

			{/* Search songs */}
			<div className='page-block'>
				<Titlebar title='单曲' onClick={() => setCurrentTab(SearchType.SONG)} />
				<SonglistList songs={data?.complex.song.songs} loading={loading} />
			</div>

			{/* Search playlists */}
			<div className='page-block'>
				<Titlebar title='歌单' onClick={() => setCurrentTab(SearchType.PLAYLIST)} />
				<PlaylistList playlists={data?.complex.playList.playLists} loading={loading} />
			</div>

			{/* Search albums */}
			<div className='page-block'>
				<Titlebar title='专辑' onClick={() => setCurrentTab(SearchType.ALBUM)} />
				<AlbumList albums={data?.complex.album.albums} loading={loading} />
			</div>

			{/* Search mvs */}
			<div className='page-block'>
				<Titlebar title='MV' onClick={() => setCurrentTab(SearchType.MV)} />
				<MvList mvs={data?.mvs} loading={loading} />
			</div>

			{/* Search artists */}
			<div className='page-block'>
				<Titlebar title='歌手' onClick={() => setCurrentTab(SearchType.ARTIST)} />
				<ArtistList artists={data?.complex.artist.artists} loading={loading} />
			</div>
		</div>
	)
}
