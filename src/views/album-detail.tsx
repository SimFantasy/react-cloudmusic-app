import { useState } from 'react'
import { useParams } from 'react-router'
import { useAlbumDetail } from '@/service/queries/album'
import { AlbumDetailTopbar } from '@/components/album-detail/album-detail-topbar'
import { AlbumDetailSongList } from '@/components/album-detail/album-detail-song-list'
import { AlbumDetailTabs } from '@/components/album-detail/album-detail-tabs'
import { AlbumDetailComment } from '@/components/album-detail/album-detail-comment'
import { AlbumDetailDescription } from '@/components/album-detail/album-detail-description'

const AlbumDetail = () => {
	const { albumId } = useParams<{ albumId: string }>()
	const [currentTab, setCurrentTab] = useState('歌曲')

	const { data, loading } = useAlbumDetail({ id: Number(albumId as string) })

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<AlbumDetailTopbar detail={data} loading={loading} />
				<AlbumDetailTabs
					album={data?.album}
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
				{currentTab === '歌曲' && <AlbumDetailSongList songs={data?.songs} loading={loading} />}
				{currentTab === '评论' && <AlbumDetailComment albumId={Number(albumId as string)} />}
				{currentTab === '专辑详情' && <AlbumDetailDescription desc={data?.album.description} />}
			</div>
		</div>
	)
}

export default AlbumDetail
