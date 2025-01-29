import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchPlaylistDetail,
	fetchPlaylistSongs,
	fetchNetizensPlaylists,
	NetizensPlaylistsParams,
	fetchHotCategories,
	fetchPlaylistCategories
} from '@/service/api/playlist'
import { SITE } from '@/config'
import { PlaylistDetail } from '@/types/playlist'

// 歌单详情
export const usePlaylistDetail = ({ playlistId }: { playlistId: string }) =>
	useRequest(() => fetchPlaylistDetail({ id: playlistId }))

// 歌单所有音轨
export const usePlaylistSongs = ({ playlistId }: { playlistId: string }) =>
	useRequest(() => fetchPlaylistSongs({ id: playlistId }))

// 歌单列表
// 热门分类
export const useHotCategories = () => useRequest(fetchHotCategories)

// 歌单分类
export const usePlaylistCategories = () => useRequest(fetchPlaylistCategories, { manual: true })

// 歌单 无限加载
interface NetizensPlaylistsResult {
	list: PlaylistDetail[]
	hasMore: boolean
}

const getNetizentsPlaylists = async ({
	order,
	cat,
	limit,
	offset
}: NetizensPlaylistsParams): Promise<NetizensPlaylistsResult> => {
	const response = await fetchNetizensPlaylists({ order, cat, limit, offset })
	return {
		list: response.playlists,
		hasMore: response.more
	}
}

export const useNetizensPlaylistsInfinite = ({
	order,
	cat,
	page
}: {
	order: 'new' | 'hot'
	cat: string
	page: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.PLAYLIST.LIMIT
			const offset = (page - 1) * limit

			return getNetizentsPlaylists({ cat, order, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [order, cat],
			manual: false
		}
	)
