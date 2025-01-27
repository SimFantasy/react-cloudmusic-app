// Personalized
export interface PersonalizedPlaylist {
	hasTaste: boolean
	code: number
	category: number
	result: PlaylistResult[]
}

export interface PlaylistResult {
	id: number
	name: string
	alg: string
	canDislike: boolean
	copywriter: string
	highQuality: boolean
	picUrl: string
	playCount: number
	trackCount: number
	trackNumberUpdateTime: number
	type: number
}

// New Song
export interface PersonalizedNewSong {
	code: number
	category: number
	result: NewSongResult[]
}

export interface NewSongResult {
	id: number
	type: number
	name: string
	picUrl: string
	canDislike: boolean
	song: NewSong
	alg: string
}

export interface NewSong {
	name: string
	id: number
	position: number
	status: number
	fee: number
	copyrightId: number
	disc: string
	no: number
	artists: NewSongArtist[]
	album: NewSongAlbum
	starred: boolean
	popularity: number
	score: number
	starredNum: number
	duration: number
	playedNum: number
	dayPlays: number
	hearTime: number
	ringtone: string
	copyFrom: string
	commentThreadId: string
	ftype: number
	copyright: number
	mark: number
	originCoverType: number
	single: number
	mvid: number
	rtype: number
}

export interface NewSongArtist {
	name: string
	id: number
	picId: number
	img1v1Id: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	albumSize: number
	alia?: string[]
	trans: string
	musicSize: number
	topicPerson: number
}

export interface NewSongAlbum {
	name: string
	id: number
	type: string
	size: number
	picId: number
	blurPicUrl: string
	companyId: number
	pic: number
	picUrl: string
	publishTime: number
	description: string
	tags: string
	company: string
	briefDesc: string
	artist: NewSongArtist
	artists: NewSongArtist[]
	status: number
	copyrightId: number
	commentThreadId: string
	subType: string
	onSale: boolean
	mark: number
	gapless: number
	picId_str: string
}
