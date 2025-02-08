/* eslint-disable @typescript-eslint/no-explicit-any */
import { SITE } from '@/config'
import { fetcher } from '@/service/fetcher'
import {
	SearchSongResponse,
	SearchSongResult,
	SearchAlbumResponse,
	SearchAlbumResult,
	SearchArtistResponse,
	SearchArtistResult,
	SearchPlaylistResponse,
	SearchPlaylistResult,
	SearchMvResponse,
	SearchMvResult,
	SearchComplexResponse,
	SearchComplexResult
} from '@/types/search'

/**
 * 搜索
 * 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户
 * @param keywords : 关键词 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 )
 * @param limit : 可选参数， 返回数量 , 默认为 30
 * @param offset : 可选参数， 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param type: 可选参数， 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 */

export enum SearchTypeEnums {
	SONG = 1,
	ALBUM = 10,
	ARTIST = 100,
	PLAYLIST = 1000,
	MV = 1004,
	COMPLEX = 1018
}

export type FetchSearchResponse =
	| SearchSongResponse
	| SearchAlbumResponse
	| SearchArtistResponse
	| SearchPlaylistResponse
	| SearchMvResponse
	| SearchComplexResponse

export type FetchSearchResult =
	| SearchSongResult
	| SearchAlbumResult
	| SearchArtistResult
	| SearchPlaylistResult
	| SearchMvResult
	| SearchComplexResult

export interface SearchParams {
	keywords: string
	limit?: number
	offset?: number
	type?: SearchTypeEnums
	isSimple?: boolean
}

export const fetchSearch = async ({
	keywords,
	limit,
	offset,
	type,
	isSimple = true
}: SearchParams): Promise<FetchSearchResult> => {
	const url = isSimple ? '/search' : '/cloudsearch'
	const response = await fetcher<any, FetchSearchResponse>({
		method: 'GET',
		url,
		params: { keywords, limit, offset, type }
	})

	return response.result || {}
}

/**
 * 综合搜索
 */
export const fetchSearchComplex = async (keywords: string) => {
	const [complex, mv] = await Promise.all([
		fetchSearch({
			keywords,
			type: SearchTypeEnums.COMPLEX,
			limit: SITE.SEARCH.COMPLEX_LIMIT
		}) as Promise<SearchComplexResult>,
		fetchSearch({
			keywords,
			type: SearchTypeEnums.MV,
			limit: SITE.SEARCH.COMPLEX_LIMIT,
			isSimple: true
		}) as Promise<SearchMvResult>
	])

	return {
		complex,
		mvs: mv.mvs
	}
}
