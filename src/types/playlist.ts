/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 歌单详情
 */
export interface PlaylistResponse {
	code: number
	playlist: PlaylistDetail
}

// 歌单详情
export interface PlaylistDetail {
	id: number
	name: string
	coverImgUrl: string
	userId: number
	createTime: number
	status: number
	opRecommend?: boolean
	highQuality?: boolean
	newImported?: boolean
	updateTime: number
	trackCount: number
	trackUpdateTime: number
	playCount: number
	trackNumberUpdateTime: number
	subscribedCount: number
	cloudTrackCount: number
	shareCount: number
	commentCount: number
	description: string
	tags: string[]
	subscribers: Subscriber[]
	creator: Creator
	tracks?: Track[]
	trackIds?: TrackId[]
	gradeStatus?: string
	score?: string
	algTags: string[]
	playlistType?: string
}

// 歌单
export type Playlist = Track[]

// 曲目
export interface Track {
	name: string
	id: number
	dt: number
	al: Album
	ar: Artist[]
	mv: number
	cp: number
	publishTime: number
}

// 专辑
export interface Album {
	id: number
	name: string
	picUrl?: string
}

// 歌手
export interface Artist {
	id: number
	name: string
	picUrl?: string
}

// 歌单创建者
export interface Creator {
	avatarUrl: string
	gender: number
	userId: number
	nickname: string
	signature: string
	backgroundUrl: string
	expertTags: string[]
	anchor: boolean
}

// 歌单订阅者
export interface Subscriber {
	avatarUrl: string
	gender: number
	userId: number
	nickname: string
	signature: string
	backgroundUrl: string
}

// 曲目ID
export interface TrackId {
	id: number
	at: number
	uid: number
	rcmdReason: string
	rcmdReasonTitle: string
}

/**
 * 歌单所有歌曲
 */
export interface PlaylistSongs {
	songs: Song[]
	code: number
}

// 歌曲
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Song extends Track {}

/**
 * 歌单详情动态
 */
export interface PlaylistDetailDynamic {
	commentCount: number
	shareCount: number
	playCount: number
	bookedCount: number
	subscribed: boolean
	remarkName: any
	followed: boolean
	gradeStatus: string
	remixVideo: any
	code: number
}

/**
 * 歌曲URL
 */
export interface SongsUrl {
	data: SongUrl[]
	code: number
}

export interface SongUrl {
	id: number
	url: string
	br: number
	size: number
	md5: string
	code: number
	expi: number
	type: string
	time: number
}

/**
 * 歌曲质量
 * standard: 标准
 * higher: 较高
 * exhigh: 极高
 * lossless: 无损
 * hires: Hi-Res
 * jyeffect : 高清环绕声
 * sky: 沉浸环绕声
 * jymaster: 超清母带
 */
export type SongLevelType =
	| 'standard'
	| 'higher'
	| 'exhigh'
	| 'lossless'
	| 'hires'
	| 'jyeffect'
	| 'sky'
	| 'jymaster'

/**
 * 歌词
 */
export interface Lyric {
	lrc: Lrc
	code: number
}

export interface Lrc {
	version: number
	lyric: string
}

/**
 * 歌单分类
 */
export interface PlaylistCategories {
	code: number
	all: Category
	sub: Category[]
	categories: Categories
}

// 分类
export interface Category {
	name: string
	resourceCount: number
	type: number
	category: number
	hot: boolean
}
// 歌单类型
export interface Categories {
	[key: string]: string
}

/**
 * 热门歌单分类标签
 */
export interface HotCategories {
	tags: CategoryTag[]
	code: number
}

export interface CategoryTag {
	playlistTag: PlaylistTag
	activity: boolean
	createTime: number
	usedCount: number
	hot: boolean
	position: number
	category: number
	name: string
	id: number
	type: number
}

export interface PlaylistTag {
	id: number
	name: string
	category: number
	usedCount: number
	type: number
	position: number
	createTime: number
	highQuality: number
	highQualityPos: number
	officialPos: number
}

/**
 * 网友精选碟歌单列表
 */
export interface NetizensPlaylists {
	playlists: PlaylistDetail[]
	total: number
	code: number
	more: boolean
	cat: string
}

/**
 * 精品歌单列表
 */
export interface HighQualityPlaylists {
	playlists: PlaylistDetail[]
	code: number
	more: boolean
	lasttime: number
	total: number
}

/**
 * 精品歌单标签列表
 */
export interface HighQualityTags {
	tags: HighQualityTag[]
	code: number
}

export interface HighQualityTag {
	id: number
	name: string
	type: number
	category: number
	hot: boolean
}
