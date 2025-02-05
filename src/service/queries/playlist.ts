import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchPlaylistDetail,
	fetchPlaylistSongs,
	fetchNetizensPlaylists,
	NetizensPlaylistsParams,
	fetchHotCategories,
	fetchPlaylistCategories,
	PlaylistCommentsParams,
	fetchPlaylistComments,
	PlaylistSubscribersParams,
	fetchPlaylistSubscribers
} from '@/service/api/playlist'
import { SITE } from '@/config'
import { PlaylistDetail, PlaylistSubscriber } from '@/types/playlist'
import { Comment } from '@/types/comment'

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

/**
 * 歌单评论 无限加载
 */
interface PlaylistCommentsResult {
	list: Comment[]
	hotComments: Comment[]
	before: number
	hasMore: boolean
}

const getPlaylistComments = async ({
	id,
	limit,
	offset,
	before
}: PlaylistCommentsParams): Promise<PlaylistCommentsResult> => {
	const response = await fetchPlaylistComments({ id, limit, offset, before })
	return {
		list: response.comments,
		before: response.comments[response.comments.length - 1].time,
		hotComments: response.hotComments,
		hasMore: response.more
	}
}

export const usePlaylistCommentsInfinite = ({
	id,
	page,
	before
}: {
	id: number
	page: number
	before?: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.PLAYLIST.COMMENT_LIMIT
			const offset = (page - 1) * limit
			return getPlaylistComments({ id, limit, offset, before })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: true
		}
	)

/**
 * 歌单订阅者
 */
interface PlaylistSubscriberResult {
	list: PlaylistSubscriber[]
	hasMore: boolean
}

const getPlaylistSubscriber = async ({
	id,
	limit,
	offset
}: PlaylistSubscribersParams): Promise<PlaylistSubscriberResult> => {
	const response = await fetchPlaylistSubscribers({ id, limit, offset })
	return {
		list: response.subscribers,
		hasMore: response.more
	}
}

export const usePlaylistSubscriberInfinite = ({ id, page }: { id: number; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.PLAYLIST.SUBSCRIBE_LIMIT
			const offset = (page - 1) * limit
			return getPlaylistSubscriber({ id, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: true
		}
	)
