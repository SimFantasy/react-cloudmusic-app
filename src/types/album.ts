import type { Artist } from '@/types/playlist'

/**
 *  最新专辑
 */
export interface NewestAlbum {
	code: number
	albums: Album[]
}

export interface Album {
	name: string
	id: number
	type: string
	size: number
	blurPicUrl: string
	picUrl: string
	publishTime: number
	tags: string
	company: string
	alias: string[]
	status: number
	artist: Artist
	artists: Artist[]
}

export interface AlbumArtist extends Artist {
	img1v1Url: string
	albumSize: number
	musicSize: number
	alias: string[]
	trans: string

	followed?: boolean
}

/**
 * 新碟上架
 */
export interface TopAlbum {
	weekData: AlbumData[]
	hasMore: boolean
	monthData: AlbumData[]
	code: number
}

export interface AlbumData {
	paid: boolean
	onSale: boolean
	blurPicUrl: string
	company?: string
	publishTime: number
	picUrl: string
	subType: string
	alias: string[]
	tags: string
	status: number
	name: string
	id: number
	type: string
	size: number
	areaId: number
	exclusive: boolean
	isSub: boolean
	transNames?: string[]

	artist: AlbumArtist
	artists: AlbumArtist[]
}
