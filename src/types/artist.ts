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
	musicSize: number
	alias: string[]
	briefDesc: string
	fansCount: number
	followed: boolean
	id: number
	img1v1Url: string
	name: string
	picUrl: string
	topicPerson: number
	trans: string
	accountId?: number
	transNames?: string[]

	publishTime?: number
	mvSize?: number
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

/**
 * 热门歌手
 */
export interface HotArtists {
	code: number
	more: boolean
	artists: Artist[]
}

/**
 * 歌手基本信息
 */
export interface ArtistInfo {
	artist: Artist
	hotSongs: Song[]
	more: boolean
	code: number
}

/**
 * 歌手详情
 */
export interface ArtistDetail {
	code: number
	message: string
	data: ArtistDetailData
}

export interface ArtistDetailData {
	videoCount: number
	identify: {
		imageUrl: string
		imageDesc: string
		actionUrl: string
	}
	artist: Artist
	blacklist: boolean
	preferShow: number
	showPriMsg: boolean
}

/**
 * 歌手描述
 */
export interface ArtistDescription {
	introduction: Introduction[]
	briefDesc: string
	count: number
	topicData: TopicDaum[]
	code: number
}

export interface Introduction {
	ti: string
	txt: string
}

export interface TopicDaum {
	topic: Topic
	creator: Creator
	shareCount: number
	commentCount: number
	likedCount: number
	liked: boolean
	rewardCount: number
	rewardMoney: number
	rectanglePicUrl: string
	coverUrl: string
	categoryId: number
	categoryName: string
	reward: boolean
	shareContent: string
	wxTitle: string
	addTime: number
	seriesId: number
	showComment: boolean
	showRelated: boolean
	summary: string
	recmdTitle: string
	recmdContent: string
	readCount: number
	url: string
	title: string
	tags: string[]
	commentThreadId: string
	mainTitle: string
	id: number
	number: number
}

export interface Topic {
	id: number
	addTime: number
	mainTitle: string
	title: string
	content: Content[]
	userId: number
	cover: number
	headPic: number
	shareContent: string
	wxTitle: string
	showComment: boolean
	status: number
	seriesId: number
	pubTime: number
	readCount: number
	tags: string[]
	pubImmidiatly: boolean
	auditor: string
	auditTime: number
	auditStatus: number
	startText: string
	delReason: string
	showRelated: boolean
	fromBackend: boolean
	rectanglePic: number
	updateTime: number
	reward: boolean
	summary: string
	adInfo: string
	categoryId: number
	hotScore: number
	recomdTitle: string
	recomdContent: string
	number: number
}

export interface Content {
	type: number
	id: number
	content?: string
}

export interface Creator {
	userId: number
	userType: number
	nickname: string
	avatarImgId: number
	avatarUrl: string
	backgroundImgId: number
	backgroundUrl: string
	signature: string
	createTime: number
	userName: string
	accountType: number
	shortUserName: string
	birthday: number
	authority: number
	gender: number
	accountStatus: number
	province: number
	city: number
	authStatus: number
	description?: string
	detailDescription?: string
	defaultAvatar: boolean
	expertTags?: string[]
	djStatus: number
	locationStatus: number
	vipType: number
	followed: boolean
	mutual: boolean
	authenticated: boolean
	lastLoginTime: number
	lastLoginIP: string
	viptypeVersion: number
	authenticationTypes: number
	anchor: boolean
}

/**
 * 歌手专辑
 */
export interface ArtistAlbums {
	artist: Artist
	hotAlbums: Album[]
	more: boolean
	code: number
}

export interface Album {
	paid: boolean
	onSale: boolean
	mark: number
	publishTime: number
	company: string
	briefDesc: string
	copyrightId: number
	artists: Artist[]
	picId: number
	artist: Artist
	picUrl: string
	commentThreadId: string
	blurPicUrl: string
	companyId: number
	pic: number
	status: number
	subType: string
	description: string
	tags: string
	name: string
	id: number
	type: string
	size: number
	picId_str: string
	isSub: boolean
}

/**
 * 歌手MV
 */
export interface ArtistMvs {
	mvs: Mv[]
	time: number
	hasMore: boolean
	code: number
}

export interface Mv {
	id: number
	name: string
	status: number
	artist: Artist
	imgurl16v9: string
	imgurl: string
	artistName: string
	duration: number
	playCount: number
	publishTime: string
	subed: boolean
}
