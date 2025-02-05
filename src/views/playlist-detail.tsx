import { useState } from 'react'
import { useParams } from 'react-router'

import { DetailTopbar } from '@/components/playlist-detail/detail-topbar'
import { DetailSongList } from '@/components/playlist-detail/detail-song-list'
import { DetailTabs } from '@/components/playlist-detail/detail-tabs'
import { DetailComment } from '@/components/playlist-detail/detail-comment'
import { DetailSubscribe } from '@/components/playlist-detail/detail-subscribe'

import { usePlaylistDetail, usePlaylistSongs } from '@/service/queries/playlist'

const PlaylistDetail = () => {
	const { playlistId } = useParams<{ playlistId: string }>()
	const [currentTab, setCurrentTab] = useState('歌曲')
	// 歌单详情
	const { data: playlistDetail, loading: loadingDetail } = usePlaylistDetail({
		playlistId: playlistId as string
	})

	// 歌单所有音轨
	const { data: playlistSongs, loading: loadingSongs } = usePlaylistSongs({
		playlistId: playlistId as string
	})

	// 歌单标签信息
	const counts = {
		trackCount: playlistDetail?.trackCount,
		commentCount: playlistDetail?.commentCount,
		subscribedCount: playlistDetail?.subscribedCount
	}

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<DetailTopbar detail={playlistDetail} loading={loadingDetail} />
				<DetailTabs currentTab={currentTab} setCurrentTab={setCurrentTab} counts={counts} />

				{currentTab === '歌曲' && <DetailSongList songs={playlistSongs} loading={loadingSongs} />}
				{currentTab === '评论' && <DetailComment playlistId={Number(playlistId)} />}
				{currentTab === '收藏' && <DetailSubscribe playlistId={Number(playlistId)} />}
			</div>
		</div>
	)
}

export default PlaylistDetail
