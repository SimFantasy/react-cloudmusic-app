'use client'

import { useState } from 'react'

import { DetailTopbar } from '@/components/playlist-detail/detail-topbar'
import { DetailSongList } from '@/components/playlist-detail/detail-song-list'
import { DetailTabs } from '@/components/playlist-detail/detail-tabs'

import { usePlaylistDetail, usePlaylistSongs } from '@/service/queries/playlist'

type PlaylistDetailProps = {
	id: string
}

export const PlaylistDetail = ({ id }: PlaylistDetailProps) => {
	const [currentTab, setCurrentTab] = useState('歌曲')

	// 获取歌单详情
	const { data: playlistDetail, loading: loadingDetail } = usePlaylistDetail({ playlistId: id })
	// 获取歌单所有歌曲
	const { data: playlistSongs, loading: loadingSongs } = usePlaylistSongs({ playlistId: id })

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
				<DetailSongList songs={playlistSongs} loading={loadingSongs} />
			</div>
		</div>
	)
}
