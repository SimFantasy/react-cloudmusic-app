import { useRequest } from 'alova/client'
import { fetchePlaylistDetail, fetchPlaylistSongs } from '@/service/api/playlist'

// 歌单详情
export const usePlaylistDetail = ({ playlistId }: { playlistId: string }) =>
	useRequest(() => fetchePlaylistDetail({ id: Number(playlistId) }))

// 歌单所有音轨
export const usePlaylistSongs = ({ playlistId }: { playlistId: string }) =>
	useRequest(() => fetchPlaylistSongs({ id: Number(playlistId) }))
