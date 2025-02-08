import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchSearch,
	fetchSearchComplex,
	SearchParams,
	SearchTypeEnums
} from '@/service/api/search'
import { NewSong } from '@/types/discover'
import { Album, Artist } from '@/types/artist'
import { Playlist } from '@/types/playlist'
import type {
	SearchSongResult,
	SearchAlbumResult,
	SearchArtistResult,
	SearchPlaylistResult,
	SearchMvResult,
	SearchMv
} from '@/types/search'
import { SITE } from '@/config'

/**
 * 综合搜索
 */
export const useSearchComplex = (keywords: string) => useRequest(() => fetchSearchComplex(keywords))

/**
 * 搜索：歌曲 无限加载
 */
interface SongResult {
	list: NewSong[]
	hasMore: boolean
}

const getSearchSong = async ({ keywords, limit, offset }: SearchParams): Promise<SongResult> => {
	const response = (await fetchSearch({
		keywords,
		limit,
		offset,
		type: SearchTypeEnums.SONG
	})) as SearchSongResult
	return {
		list: response.songs,
		hasMore: response.hasMore
	}
}

export const useSearchSongInfinite = ({ keywords, page }: { keywords: string; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.SEARCH.LIMIT
			const offset = (page - 1) * limit

			return getSearchSong({ keywords, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [keywords],
			manual: false
		}
	)

/**
 * 搜索：专辑 无限加载
 */
interface AlbumResult {
	list: Album[]
	hasMore: boolean
}

const getSearchAlbum = async ({ keywords, limit, offset }: SearchParams): Promise<AlbumResult> => {
	const response = (await fetchSearch({
		keywords,
		limit,
		offset,
		type: SearchTypeEnums.ALBUM
	})) as SearchAlbumResult

	const hasMore = response.albumCount > offset! + limit!
	return {
		list: response.albums,
		hasMore
	}
}

export const useSearchAlbumInfinite = ({ keywords, page }: { keywords: string; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.SEARCH.LIMIT
			const offset = (page - 1) * limit

			return getSearchAlbum({ keywords, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [keywords],
			manual: false
		}
	)

/**
 * 搜索：歌手 无限加载
 */
interface ArtistResult {
	list: Artist[]
	hasMore: boolean
}

const getSearchArtist = async ({
	keywords,
	limit,
	offset
}: SearchParams): Promise<ArtistResult> => {
	const response = (await fetchSearch({
		keywords,
		limit,
		offset,
		type: SearchTypeEnums.ARTIST
	})) as SearchArtistResult
	return {
		list: response.artists,
		hasMore: response.hasMore
	}
}

export const useSearchArtistInfinite = ({ keywords, page }: { keywords: string; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.SEARCH.LIMIT
			const offset = (page - 1) * limit

			return getSearchArtist({ keywords, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [keywords],
			manual: false
		}
	)

/**
 * 搜索：歌单 无限加载
 */
interface PlaylistResult {
	list: Playlist[]
	hasMore: boolean
}

const getSearchPlaylist = async ({
	keywords,
	limit,
	offset
}: SearchParams): Promise<PlaylistResult> => {
	const response = (await fetchSearch({
		keywords,
		limit,
		offset,
		type: SearchTypeEnums.PLAYLIST
	})) as SearchPlaylistResult
	return {
		list: response.playlists,
		hasMore: response.hasMore
	}
}

export const useSearchPlaylistInfinite = ({ keywords, page }: { keywords: string; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.SEARCH.LIMIT
			const offset = (page - 1) * limit

			return getSearchPlaylist({ keywords, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [keywords],
			manual: false
		}
	)

/**
 * 搜索：MV 无限加载
 */
interface MvResult {
	list: SearchMv[]
	hasMore: boolean
}

const getSearchMv = async ({ keywords, limit, offset }: SearchParams): Promise<MvResult> => {
	const response = (await fetchSearch({
		keywords,
		limit,
		offset,
		type: SearchTypeEnums.MV
	})) as SearchMvResult

	const hasMore = response.mvCount > offset! + limit!
	return {
		list: response.mvs,
		hasMore
	}
}

export const useSearchMvInfinite = ({ keywords, page }: { keywords: string; page: number }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.SEARCH.LIMIT
			const offset = (page - 1) * limit

			return getSearchMv({ keywords, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [keywords],
			manual: false
		}
	)
