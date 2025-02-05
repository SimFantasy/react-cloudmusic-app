import type { Artist, Song } from '@/types/playlist'
import { Album as AlbumType } from '@/types/artist'

/**
 *  最新专辑
 */
export interface NewestAlbum {
	code: number
	albums: Album[]
}

export interface Album extends Partial<AlbumType> {
	publishTime: number
	tags: string
	info: AlbumInfo
}

export interface AlbumInfo {
	liked: boolean
	resourceType: number
	resourceId: number
	commentCount: number
	likedCount: number
	shareCount: number
	threadId: string
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

/**
 * 全部专辑
 */
export interface AllNewAlbums {
	total: number
	albums: Album[]
	code: number
}

/**
 * 数字专辑
 */
export interface DigitalAlbum {
	products: Product[]
	code: number
}

export interface Product {
	newAlbum: boolean
	albumId: number
	albumName: string
	artistName: string
	price: number
	coverUrl: string
	pubTime: number
	productId: number
	saleNum: number
	albumType: number
	saleType: number
	area: number
	artistType: number
	status: number
}

/**
 * 专辑内容
 */
export interface AlbumDetail {
	resourceState: boolean
	songs: Song[]
	code: number
	album: Album
}
