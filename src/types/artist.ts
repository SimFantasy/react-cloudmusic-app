import type { Song } from '@/types/playlist'

/**
 * 歌手分类列表
 */
export interface ArtistCategories {
	artists: Artist[]
	more: boolean
	code: number
}

export interface Artist {
	albumSize: number
	alias: string[]
	briefDesc: string
	fansCount: number
	followed: boolean
	id: number
	img1v1Url: string
	musicSize: number
	name: string
	picUrl: string
	topicPerson: number
	trans: string
	accountId?: number
	transNames?: string[]
}

/**
 * 歌手热门歌曲
 */
export interface ArtistHotSong {
	code: number
	more: boolean
	songs: Song[]
}

/**
 * 歌手所有歌曲
 */
export interface ArtistSongs {
	songs: Song[]
	more: boolean
	total: number
	code: number
}

// 歌手分类类型
export type ArtistCategory = { area?: string; type?: string; initial?: string }
