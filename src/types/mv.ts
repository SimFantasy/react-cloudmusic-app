/**
 * MV详情
 */
export interface MvDetail {
	loadingPic: string
	bufferPic: string
	loadingPicFS: string
	bufferPicFS: string
	subed: boolean
	data: MvData
	code: number
}

export interface MvData {
	id: number
	name: string
	artistId: number
	artistName: string
	briefDesc: string
	desc: string
	cover: string
	coverId_str: string
	coverId: number
	playCount: number
	subCount: number
	shareCount: number
	commentCount: number
	duration: number
	nType: number
	publishTime: string
	price: number
	brs: Br[]
	artists: MVArtist[]
	commentThreadId: string
	videoGroup: VideoGroup[]
}

export interface Br {
	size: number
	br: number
	point: number
}

export interface MVArtist {
	id: number
	name: string
	img1v1Url: string
	followed: boolean
}

export interface VideoGroup {
	id: number
	name: string
	type: number
}

/**
 * Mv 动态数据
 */
export interface MvDynamic {
	likedCount: number
	shareCount: number
	commentCount: number
	liked: boolean
	code: number
}

/**
 * Mv Url地址
 */
export interface MvUrl {
	code: number
	data: UrlData
}

export interface UrlData {
	id: number
	url: string
	r: number
	size: number
	md5: string
	code: number
	expi: number
	fee: number
	mvFee: number
	st: number
	msg: string
}
