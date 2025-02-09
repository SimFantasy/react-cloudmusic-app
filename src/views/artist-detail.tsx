import React, { useState } from 'react'
import { useParams } from 'react-router'

import { ArtistDetailTopbar } from '@/components/artist-detail/artist-detail-topbar'
import { ArtistDetailSongList } from '@/components/artist-detail/artist-detail-song-list'
import { ArtistDetailAlbumList } from '@/components/artist-detail/artist-detail-album-list'
import { ArtistDetailMvList } from '@/components/artist-detail/artist-detail-mv-list'
import { ArtistDetailDescription } from '@/components/artist-detail/artist-detail-description'
import { DetailTabs } from '@/components/common/detail-tabs'

import { useArtistDetail, useArtistTopSongs } from '@/service/queries/artist'

const ArtistDetail: React.FC = () => {
	const { artistId } = useParams<{ artistId: string }>()
	const [currentTab, setCurrentTab] = useState('歌曲')

	const { data: detailData, loading: loadingDetail } = useArtistDetail({ id: Number(artistId) })
	const { data: songsData, loading: loadingSongs } = useArtistTopSongs({ id: Number(artistId) })

	const tabs = [
		{ name: '歌曲', count: detailData?.artist?.musicSize },
		{ name: '专辑', count: detailData?.artist?.albumSize },
		{ name: 'MV', count: detailData?.artist?.mvSize },
		{ name: '歌手详情' }
	]

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<ArtistDetailTopbar artist={detailData?.artist} loading={loadingDetail} songs={songsData} />
				<DetailTabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

				{currentTab === '歌曲' && <ArtistDetailSongList songs={songsData} loading={loadingSongs} />}
				{currentTab === '专辑' && <ArtistDetailAlbumList artistId={artistId} />}
				{currentTab === 'MV' && <ArtistDetailMvList artistId={artistId} />}
				{currentTab === '歌手详情' && (
					<ArtistDetailDescription artistId={artistId} artistName={detailData?.artist.name} />
				)}
			</div>
		</div>
	)
}

export default ArtistDetail
