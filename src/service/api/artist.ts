/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/service/fetcher'
import type {
	ArtistCategories,
	ArtistHotSong,
	ArtistSongs,
	ArtistInfo,
	ArtistDescription,
	ArtistAlbums,
	Album,
	ArtistMvs,
	Mv,
	ArtistDetail,
	ArtistDetailData,
	HotArtists,
	Artist
} from '@/types/artist'
import type { Song } from '@/types/playlist'

/**
 * 获取歌手分类列表
 * @param option limit : 返回数量 , 默认为 30
 * @param option offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param option initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
 * @param option type 取值: 全部:-1 男歌手:1 女歌手:2 组合:3 乐队:4
 * @param option area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 */
export type ArtistsParams = {
	limit?: number
	offset?: number
	initial?: string
	type?: number
	area?: number
}
type ArtistsType = ({
	limit,
	offset,
	initial,
	type,
	area
}: ArtistsParams) => Promise<ArtistCategories>
export const fetchArtists: ArtistsType = async ({ limit, offset, initial, type, area }) => {
	const response = await fetcher<any, ArtistCategories>({
		method: 'GET',
		url: '/artist/list',
		params: {
			limit,
			offset,
			initial,
			type,
			area
		}
	})
	return response || {}
}

/**
 *  获取热门歌手
 * @param option limit: 取出数量 , 默认为 50
 * @param option offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
type HotArtistsType = ({ limit, offset }: { limit?: number; offset?: number }) => Promise<Artist[]>

export const fetchHotArtists: HotArtistsType = async ({ limit, offset }) => {
	const response = await fetcher<any, HotArtists>({
		method: 'GET',
		url: '/artist/top',
		params: {
			limit,
			offset
		}
	})

	return response.artists || []
}

/**
 * 歌手热门 50 首歌曲
 * @param id 歌手 id
 */

type ArtistTopSongType = ({ id }: { id: number }) => Promise<Song[]>
export const fetchArtistTopSong: ArtistTopSongType = async ({ id }) => {
	const response = await fetcher<any, ArtistHotSong>({
		method: 'GET',
		url: '/artist/top/song',
		params: { id }
	})

	return response.songs || []
}

/**
 * 歌手全部歌曲
 * @param id: 歌手 id
 * @param option order: hot ,time 按照热门或者时间排序
 * @param option limit: 取出歌单数量 , 默认为 50
 * @param option offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */

type ArtistSongsType = ({
	id,
	order,
	limit,
	offset
}: {
	id: number
	order?: 'hot' | 'time'
	limit?: number
	offset?: number
}) => Promise<Song[]>
export const fetchArtistSongs: ArtistSongsType = async ({ id, order, limit, offset }) => {
	const response = await fetcher<any, ArtistSongs>({
		method: 'GET',
		url: '/artist/songs',
		params: {
			id,
			order,
			limit,
			offset
		}
	})

	return response.songs || []
}

/**
 * 获取歌手基本信息
 * 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲50首
 * @param id 歌手 id
 */

type ArtistInfoType = ({ id }: { id: number }) => Promise<ArtistInfo>
export const fetchArtistInfo: ArtistInfoType = async ({ id }) => {
	const response = await fetcher<any, ArtistInfo>({
		method: 'GET',
		url: '/artist/info',
		params: { id }
	})
	return response || {}
}

/**
 * 获取歌手详情
 * 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * @param id 歌手 id
 */
type ArtistDetailType = ({ id }: { id: number }) => Promise<ArtistDetailData>
export const fetchArtistDetail: ArtistDetailType = async ({ id }) => {
	const response = await fetcher<any, ArtistDetail>({
		method: 'GET',
		url: '/artist/detail',
		params: { id }
	})

	return response.data || {}
}

/**
 * 获取歌手描述
 */
type ArtistDescriptionType = ({ id }: { id: number }) => Promise<ArtistDescription>
export const fetchArtistDescription: ArtistDescriptionType = async ({ id }) => {
	const response = await fetcher<any, ArtistDescription>({
		method: 'GET',
		url: '/artist/desc',
		params: { id }
	})

	return response || {}
}

/**
 * 获取歌手专辑
 * @param id: 歌手 id
 * @param option limit: 取出数量 , 默认为 30
 * @param option offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
type ArtistAlbumsType = ({
	id,
	limit,
	offset
}: {
	id: number
	limit?: number
	offset?: number
}) => Promise<Album[]>

export const fetchArtistAlbums: ArtistAlbumsType = async ({ id, limit, offset }) => {
	const response = await fetcher<any, ArtistAlbums>({
		method: 'GET',
		url: '/artist/albums',
		params: {
			id,
			limit,
			offset
		}
	})

	return response.hotAlbums || []
}

/**
 * 获取歌手 mv
 * @param id: 歌手 id
 * @param option limit: 取出数量 , 默认为 30
 */

type ArtistMvType = ({ id }: { id: number }) => Promise<Mv[]>

export const fetchArtistMvs: ArtistMvType = async ({ id }) => {
	const response = await fetcher<any, ArtistMvs>({
		method: 'GET',
		url: '/artist/mv',
		params: { id }
	})

	return response.mvs || []
}
