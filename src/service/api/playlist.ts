/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/service/fetcher'
import { http } from '@/service/http'

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
	Lyric
} from '@/types/playlist'
import { SITE } from '@/config'

/**
 * 歌单详情
 * @param id : 歌单 id
 * @param s: 歌单最近的 s 个收藏者,默认为 8
 */
export const fetchePlaylistDetail = ({ id, s }: { id: number; s?: number }) =>
	http.Get('/playlist/detail', {
		params: { id, s },
		transform(data: PlaylistResponse) {
			return data.playlist
		}
	})

/**
 * 歌单所有曲目
 * @param id : 歌单 id
 * @param limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param offset : 默认值为0
 */
export const fetchPlaylistSongs = ({
	id,
	limit,
	offset = 0
}: {
	id: number
	limit?: number
	offset?: number
}) =>
	http.Get('/playlist/track/all', {
		params: { id, limit, offset },
		transform(data: PlaylistSongs) {
			return data.songs
		}
	})

/**
 * 歌单分类
 */
export const fetchPlaylistCategories = (): Promise<PlaylistCategories> =>
	http.Get<PlaylistCategories>('/playlist/catlist')

/**
 * 热门歌单分类标签
 */
export const fetchHotCategories = () =>
	http.Get('/playlist/hot', {
		transform(data: HotCategories) {
			return data.tags
		}
	})

/**
 * 歌单 ( 网友精选碟 )
 * @param order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param cat, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param limit: 取出歌单数量 , 默认为 50
 * @param offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const fetchNetizensPlaylists = ({
	order,
	cat,
	limit,
	offset
}: {
	order?: 'new' | 'hot'
	cat?: string
	limit?: number
	offset?: number
} = {}) =>
	http.Get('/top/playlist', {
		params: { order, cat, limit, offset },
		transform(data: NetizensPlaylists) {
			return data.playlists
		}
	})

/**
 * 精品歌单标签列表
 */
export const fetchHighQualityTags = () =>
	http.Get('/playlist/highquality/tags', {
		transform(data: HighQualityTags) {
			return data.tags
		}
	})

/**
 * 获取精品歌单
 * @param cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * @param limit: 取出歌单数量 , 默认为 50
 * @param before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export const fetchHighQualityPlaylists = ({
	cat,
	limit = SITE.PLAYLIST.LIMIT,
	before
}: { cat?: string; limit?: number; before?: number } = {}) =>
	http.Get('/top/playlist/highquality', {
		params: { cat, limit, before },
		transform(data: HighQualityPlaylists) {
			return data.playlists
		}
	})

/**
 * 获取歌曲详情
 * @param ids: 音乐 id, 如 ids=347230。 传入音乐 id(支持多个 id, 用 , 隔开),
 */
export const fetchSongDetail = ({ ids }: { ids: string }) =>
	http.Get('/song/detail', {
		params: { ids },
		transform(data: PlaylistSongs) {
			return data.songs
		}
	})

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
