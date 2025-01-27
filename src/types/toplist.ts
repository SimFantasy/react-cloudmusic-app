import type { Artist, Album } from '@/types/playlist'

/**
 * 所有榜单
 */

export interface TopLists {
	code: number
	list: TopList[]
	artistToplist: ArtistToplist
}

export interface TopList {
	updateFrequency: string
	backgroundCoverId: number
	trackNumberUpdateTime: number
	trackUpdateTime: number
	updateTime: number
	coverImgUrl: string
	trackCount: number
	playCount: number
	cloudTrackCount: number
	subscribedCount: number
	createTime: number
	ordered: boolean
	specialType: number
	description?: string
	status: number
	tags: string[]
	userId: number
	name: string
	id: number
	ToplistType?: string

	tracks: Track[]
}

// 歌手排行
export interface ArtistToplist {
	coverUrl: string
	artists?: ToplistArtist[]
	name: string
	upateFrequency: string
	position: number
	updateFrequency: string
}

/**
 * 歌手
 * "first": "林俊杰",
 * "second": "",
 * "third": 63005255
 */
export interface ToplistArtist {
	first: string
	second: string
	third: number
}

/**
 * 榜单详情
 */
export interface TopListsDetail {
	code: number
	list: TopList[]
	artistToplist: ArtistToplist
	rewardToplist: RewardToplist
}

/**
 * 歌曲
 * "first": "拼图爱",
 * "second": "蒋孜怡/岳燃"
 */
export interface Track {
	first: string
	second: string
}

export interface RewardToplist {
	coverUrl: string
	songs: ToplistSong[]
	name: string
	position: number
}

export interface SongArtist extends Artist {
	img1v1Url: string
	alias: string[]
	trans: string
	musicSize: number
	topicPerson: number

	albumSize?: number
	lastRank?: number
	score?: number
}

export interface SongAlbum extends Album {
	type: string
	size: number
	blurPicUrl: string
	description: string
	tags: string
	artists: SongArtist[]
	subType: string
}

export interface ToplistSong {
	name: string
	id: number
	position: number
	alias: string[]
	status: number
	fee: number
	copyrightId: number
	disc: string
	no: number
	artists: SongArtist[]
	album: SongAlbum
	popularity: number
	score: number
	starredNum: number
	duration: number
}

/**
 * 歌手榜
 */

export interface ArtistRank {
	list: RankList
	code: number
}

export interface RankList {
	artists: SongArtist[]
	updateTime: number
	type: number
}
