import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchArtists,
	fetchArtistInfo,
	fetchArtistDetail,
	fetchArtistSongs,
	fetchArtistAlbums,
	fetchArtistMvs,
	fetchArtistDescription,
	fetchArtistTopSong
} from '@/service/api/artist'
import type { ArtistsParams } from '@/service/api/artist'
import type { Album, Artist, Mv } from '@/types/artist'
import type { Song } from '@/types/playlist'
import { SITE } from '@/config'

/**
 * 获取歌手分类列表 无限加载
 */
interface ArtistsResult {
	list: Artist[]
	hasMore: boolean
}

const getArtists = async ({
	initial,
	type,
	area,
	limit,
	offset
}: ArtistsParams): Promise<ArtistsResult> => {
	const response = await fetchArtists({ limit, offset, initial, type, area })
	return {
		list: response.artists,
		hasMore: response.more
	}
}

export const useArtistsInfinite = ({
	initial = '-1',
	type = -1,
	area = -1,
	page
}: {
	initial?: string
	type?: number
	area?: number
	page: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ARTIST.ARTIST_LIMIT
			const offset = (page - 1) * limit
			return getArtists({ initial, type, area, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [initial, type, area],
			manual: false
		}
	)

/**
 * 获取歌手基本信息
 */

export const useArtistInfo = ({ id }: { id: number }) => useRequest(() => fetchArtistInfo({ id }))

/**
 * 获取歌手详情
 */
export const useArtistDetail = ({ id }: { id: number }) =>
	useRequest(() => fetchArtistDetail({ id }))

/**
 * 获取歌手所有歌曲(没有歌曲封面图片) 无限加载
 */
interface ArtistSongsResult {
	list: Song[]
	hasMore: boolean
}

const getArtistSongs = async ({
	id,
	order,
	limit,
	offset
}: {
	id: number
	order?: 'hot' | 'time'
	limit?: number
	offset?: number
}): Promise<ArtistSongsResult> => {
	const response = await fetchArtistSongs({ id, order, limit, offset })
	return {
		list: response.songs,
		hasMore: response.more
	}
}

export const useArtistSongsInfinite = ({
	id,
	order = 'hot',
	page
}: {
	id: number
	order?: 'hot' | 'time'
	page: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ARTIST.SONG_LIMIT
			const offset = (page - 1) * limit
			return getArtistSongs({ id, order, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [order],
			manual: false
		}
	)
/**
 * 获取歌手50首热门歌曲
 */
export const useArtistTopSongs = ({ id }: { id: number }) =>
	useRequest(() => fetchArtistTopSong({ id }))

/**
 * 获取歌手所有专辑 无限加载
 */
interface ArtistAlbumsResult {
	list: Album[]
	hasMore: boolean
}

const getArtistAlbums = async ({
	id,
	limit,
	offset
}: {
	id: number
	limit?: number
	offset?: number
}): Promise<ArtistAlbumsResult> => {
	const response = await fetchArtistAlbums({ id, limit, offset })
	return {
		list: response.hotAlbums,
		hasMore: response.more
	}
}

export const useArtistAlbumsInfinite = ({ id, page }: { id: number; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ARTIST.ALBUM_LIMIT
			const offset = (page - 1) * limit
			return getArtistAlbums({ id, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: false
		}
	)

/**
 * 获取歌手所有Mv 无限加载
 */
interface ArtistMvsResult {
	list: Mv[]
	hasMore: boolean
}

const getArtistMvs = async ({
	id,
	limit,
	offset
}: {
	id: number
	limit?: number
	offset?: number
}): Promise<ArtistMvsResult> => {
	const response = await fetchArtistMvs({ id, limit, offset })
	return {
		list: response.mvs,
		hasMore: response.hasMore
	}
}

export const useArtistMvsInfinite = ({ id, page }: { id: number; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ARTIST.MV_LIMIT
			const offset = (page - 1) * limit
			return getArtistMvs({ id, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: false
		}
	)

/**
 *  获取歌手简介
 */
export const useArtistDesc = ({ id }: { id: number }) =>
	useRequest(() => fetchArtistDescription({ id }))
