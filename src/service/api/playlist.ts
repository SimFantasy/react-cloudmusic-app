/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/service/fetcher'

import type {
	PlaylistResponse,
	PlaylistSongs,
	SongsUrl,
	SongUrl,
	SongLevelType,
	PlaylistCategories,
	HotCategories,
	NetizensPlaylists,
	HighQualityPlaylists,
	HighQualityTags,
	Lyric,
	Track,
	PlaylistDetail,
	Song,
	HighQualityTag,
	CategoryTag
} from '@/types/playlist'
import { SITE } from '@/config'

/**
 * 歌单详情
 * @param id : 歌单 id
 * @param s: 歌单最近的 s 个收藏者,默认为 8
 */

type PlaylistDetailParams = { id: string; s?: number }
type PlaylistDetailType = (params: PlaylistDetailParams) => Promise<PlaylistDetail>

export const fetchPlaylistDetail: PlaylistDetailType = async ({ id, s }) => {
	const response = await fetcher<any, PlaylistResponse>({
		method: 'GET',
		url: '/playlist/detail',
		params: { id, s }
	})

	return response.playlist || {}
}

/**
 * 歌单所有曲目
 * @param id : 歌单 id
 * @param limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param offset : 默认值为0
 */

type PlaylistSongsParams = { id: string; limit?: number; offset?: number }
type PlaylistSongsType = (params: PlaylistSongsParams) => Promise<Track[]>

export const fetchPlaylistSongs: PlaylistSongsType = async ({ id, limit = 20, offset = 0 }) => {
	const response = await fetcher<any, PlaylistSongs>({
		method: 'GET',
		url: '/playlist/track/all',
		params: { id, limit, offset }
	})

	return response.songs || []
}

/**
 * 歌单分类
 */

type PlaylistCategoriesType = () => Promise<PlaylistCategories>

export const fetchPlaylistCategories: PlaylistCategoriesType = async () => {
	const response = await fetcher<any, PlaylistCategories>({
		method: 'GET',
		url: '/playlist/catlist'
	})

	return response || {}
}

/**
 * 热门歌单分类标签
 */

type HotCategoriesType = () => Promise<CategoryTag[]>

export const fetchHotCategories: HotCategoriesType = async () => {
	const response = await fetcher<any, HotCategories>({
		method: 'GET',
		url: '/playlist/hot'
	})
	return response.tags || []
}

/**
 * 歌单 ( 网友精选碟 )
 * @param order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param cat, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param limit: 取出歌单数量 , 默认为 50
 * @param offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */

export type NetizensPlaylistsParams = {
	order?: 'new' | 'hot'
	cat?: string
	limit?: number
	offset?: number
}
type NetizensPlaylistsType = (params?: NetizensPlaylistsParams) => Promise<NetizensPlaylists>

export const fetchNetizensPlaylists: NetizensPlaylistsType = async ({
	order,
	cat,
	limit,
	offset
} = {}) => {
	const response = await fetcher<any, NetizensPlaylists>({
		method: 'GET',
		url: '/top/playlist',
		params: { order, cat, limit, offset }
	})

	return response
}

/**
 * 精品歌单标签列表
 */

type HighQualityTagsType = () => Promise<HighQualityTag[]>

export const fetchHighQualityTags: HighQualityTagsType = async () => {
	const response = await fetcher<any, HighQualityTags>({
		method: 'GET',
		url: '/playlist/highquality/tags'
	})
	return response.tags || []
}

/**
 * 获取精品歌单
 * @param cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * @param limit: 取出歌单数量 , 默认为 50
 * @param before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */

type HighQualityPlaylistsParams = { cat?: string; limit?: number; before?: number }
type HighQualityPlaylistsType = (params: HighQualityPlaylistsParams) => Promise<PlaylistDetail[]>

export const fetchHighQualityPlaylists: HighQualityPlaylistsType = async ({
	cat = '全部',
	limit = SITE.PLAYLIST.LIMIT,
	before
}) => {
	const response = await fetcher<any, HighQualityPlaylists>({
		method: 'GET',
		url: '/top/playlist/highquality',
		params: { cat, limit, before }
	})
	return response.playlists || []
}

/**
 * 获取歌曲详情
 * @param ids: 音乐 id, 如 ids=347230。 传入音乐 id(支持多个 id, 用 , 隔开),
 */

type SongDetailParams = { ids: string }
type SongDetailType = (params: SongDetailParams) => Promise<Song[]>

export const fetchSongDetail: SongDetailType = async ({ ids }) => {
	const response = await fetcher<any, PlaylistSongs>({
		method: 'GET',
		url: '/song/detail',
		params: { ids }
	})

	return response.songs || []
}

// =================================

/**
 * 获取歌曲 url
 * @param ids : 歌曲 id 列表
 * @param level : 音质等级，默认值为 exhigh
 */

type PlaylistSongsUrlParams = { ids: string[]; level?: SongLevelType }
type PlaylistSongsUrlType = (params: PlaylistSongsUrlParams) => Promise<SongUrl[]>

export const fetchSongsUrl: PlaylistSongsUrlType = async ({ ids, level = 'exhigh' }) => {
	const id = ids.join(',')

	const response = await fetcher<any, SongsUrl>({
		method: 'GET',
		url: '/song/url/v1',
		params: { id, level }
	})

	return response.data || []
}

/**
 * 获取歌词
 * @param id : 歌曲 id
 */
type LyricParams = { id: string }
type LyricType = (params: LyricParams) => Promise<string>

export const fetchLyric: LyricType = async ({ id }) => {
	const response = await fetcher<any, Lyric>({
		method: 'GET',
		url: '/lyric',
		params: { id }
	})

	return response.lrc.lyric || ''
}
