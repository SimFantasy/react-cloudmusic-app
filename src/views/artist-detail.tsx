import { useState } from 'react'
import { useParams } from 'react-router'

import { useArtistDetail } from '@/service/queries/artist'
import { ArtistDetailTopbar } from '@/components/artist-detail/artist-detail-topbar'
import { ArtistDetailSongList } from '@/components/artist-detail/artist-detail-song-list'
import { ArtistDetailAlbumList } from '@/components/artist-detail/artist-detail-album-list'
import { ArtistDetailMvList } from '@/components/artist-detail/artist-detail-mv-list'
import { ArtistDetailDescription } from '@/components/artist-detail/artist-detail-description'

import { DetailTabs } from '@/components/common/detail-tabs'

const ArtistDetail: React.FC = () => {
	const { artistId } = useParams<{ artistId: string }>()
	const [currentTab, setCurrentTab] = useState('歌曲')
	const { data, loading } = useArtistDetail({ id: Number(artistId) })

	const tabs = [
		{ name: '歌曲', count: data?.artist?.musicSize },
		{ name: '专辑', count: data?.artist?.albumSize },
		{ name: 'MV', count: data?.artist?.mvSize },
		{ name: '歌手详情' }
	]

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<ArtistDetailTopbar artist={data?.artist} loading={loading} />
				<DetailTabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

				{currentTab === '歌曲' && <ArtistDetailSongList artistId={artistId} />}
				{currentTab === '专辑' && <ArtistDetailAlbumList artistId={artistId} />}
				{currentTab === 'MV' && <ArtistDetailMvList artistId={artistId} />}
				{currentTab === '歌手详情' && (
					<ArtistDetailDescription artistId={artistId} artistName={data?.artist.name} />
				)}
			</div>
		</div>
	)
}

export default ArtistDetail
