import { useState } from 'react'
import { useSearchParams } from 'react-router'

import { SearchComplex } from '@/components/search/search-complex'
import { SearchSong } from '@/components/search/search-song'
import { SearchPlaylist } from '@/components/search/search-playlist'
import { SearchArtist } from '@/components/search/search-artist'
import { SearchAlbum } from '@/components/search/search-album'
import { SearchMv } from '@/components/search/search-mv'
import { DetailTabs } from '@/components/common/detail-tabs'

import { SearchType } from '@/types/search'

const Search: React.FC = () => {
	const [currentTab, setCurrentTab] = useState('综合')
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q') || ''

	const tabs = [
		{ name: SearchType.COMPLEX },
		{ name: SearchType.SONG },
		{ name: SearchType.PLAYLIST },
		{ name: SearchType.ARTIST },
		{ name: SearchType.ALBUM },
		{ name: SearchType.MV }
	]
	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				{/* Search keyword */}
				<section className='flex items-baseline gap-x-2'>
					<h1 className='text-2xl text-primary/80 font-semibold'>{query}</h1>
					<span className='text-sm text-primary/40'>的相关搜索结果如下</span>
				</section>

				{/* Search tabs */}
				<DetailTabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

				{/* Search result */}
				{currentTab === SearchType.COMPLEX && (
					<SearchComplex query={query} setCurrentTab={setCurrentTab} />
				)}
				{currentTab === SearchType.SONG && <SearchSong query={query} />}
				{currentTab === SearchType.ALBUM && <SearchAlbum query={query} />}
				{currentTab === SearchType.ARTIST && <SearchArtist query={query} />}
				{currentTab === SearchType.PLAYLIST && <SearchPlaylist query={query} />}
				{currentTab === SearchType.MV && <SearchMv query={query} />}
			</div>
		</div>
	)
}

export default Search
