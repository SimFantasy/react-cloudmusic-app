/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/service/fetcher'
import type {
	PersonalizedPlaylist,
	PlaylistResult,
	PersonalizedNewSong,
	NewSongResult
} from '@/types/discover'
import { SITE } from '@/config'

/**
 * 获取推荐歌单
 * @param limit: 取出数量 , 默认为 30 (不支持 offset)
 */

type FetchPlaylistLimitParams = { limit?: number }
type FetchDiscoverPlaylistType = (params?: FetchPlaylistLimitParams) => Promise<PlaylistResult[]>
export const fetchDiscoverPlaylist: FetchDiscoverPlaylistType = async ({
	limit = SITE.DISCOVER.PLAYLIST_LIMIT
} = {}) => {
	const response = await fetcher<any, PersonalizedPlaylist>({
		method: 'GET',
		url: '/personalized',
		params: { limit }
	})
	return response.result || []
}

/**
 * 获取最新歌曲
 * @param limit: 取出数量 , 默认为 10 (不支持 offset)
 */
type FetchSonglistLimitParams = { limit?: number }
type FetchDiscoverNewSongType = (params?: FetchSonglistLimitParams) => Promise<NewSongResult[]>

export const fetchDiscoverNewSong: FetchDiscoverNewSongType = async ({
	limit = SITE.DISCOVER.NEWSONG_LIMIT
} = {}) => {
	const response = await fetcher<any, PersonalizedNewSong>({
		method: 'GET',
		url: '/personalized/newsong',
		params: { limit }
	})
	return response.result || []
}
