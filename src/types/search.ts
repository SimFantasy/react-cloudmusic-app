import { Album, Artist } from '@/types/artist'
import { MvData } from '@/types/mv'
import { PlaylistDetail, Song } from '@/types/playlist'
import { Album as AlbumType } from '@/types/album'

/**
 * 搜索类型
 */
export enum SearchType {
	COMPLEX = '综合',
	SONG = '单曲',
	ALBUM = '专辑',
	ARTIST = '歌手',
	PLAYLIST = '歌单',
	MV = 'MV'
}

/**
 * 搜索结果：综合
 */
export interface SearchComplexResponse {
	result: SearchComplexResult
	code: number
}

export interface SearchComplexResult {
	code: number
	song: SearchComplexSong
	playList: SearchComplexPlayList
	artist: SearchComplexArtist
	album: SearchComplexAlbum
	order: string[]
}

export interface SearchComplexSong {
	moreText: string
	songs: Song[]
	more: boolean
	resourceIds: number[]
}

export interface SearchComplexPlayList {
	moreText: string
	more: boolean
	playLists: PlaylistDetail[]
	resourceIds: number[]
}

export interface SearchComplexArtist {
	moreText: string
	artists: Artist[]
	more: boolean
	resourceIds: number[]
}

export interface SearchComplexAlbum {
	moreText: string
	albums: AlbumType[]
	more: boolean
	resourceIds: number[]
}

/**
 * 搜索结果：歌曲
 */
export interface SearchSongResponse {
	result: SearchSongResult
	code: number
}

export interface SearchSongResult {
	songs: Song[]
	hasMore: boolean
	songCount: number
}

/**
 * 搜索结果：专辑
 */
export interface SearchAlbumResponse {
	result: SearchAlbumResult
	code: number
}

export interface SearchAlbumResult {
	hlWords: string[]
	albums: Album[]
	albumCount: number
}

/**
 * 搜索结果：歌手
 */
export interface SearchArtistResponse {
	result: SearchArtistResult
	code: number
}

export interface SearchArtistResult {
	hasMore: boolean
	artistCount: number
	hlWords: string[]
	artists: Artist[]
	searchQcReminder: string
}

/**
 * 搜索结果：歌单
 */
export interface SearchPlaylistResponse {
	result: SearchPlaylistResult
	code: number
}

export interface SearchPlaylistResult {
	playlists: SearchPlaylist[]
	hasMore: boolean
	hlWords: string[]
	playlistCount: number
	searchQcReminder: string
}

export interface SearchPlaylist extends PlaylistDetail {
	action: string
	actionType: string
	alg: string
	bookCount: number
	officialTags?: string[]
	recommendText: string
	specialType: number
	subscribed: boolean
	track: Track
}

export interface Track {
	name: string
	id: number
	position: number
	alias: string[]
	status: number
	fee: number
	copyrightId: number
	disc: string
	no: number
	artists: Artist[]
	album: Album
	starred: boolean
	popularity: number
	score: number
	starredNum: number
	duration: number
	playedNum: number
	dayPlays: number
	hearTime: number
	ringtone?: string
	copyFrom: string
	commentThreadId: string
	ftype: number
	copyright: number
	mvid: number
}

/**
 * 搜索结果：MV
 */
export interface SearchMvResponse {
	result: SearchMvResult
	code: number
}

export interface SearchMvResult {
	hlWords: string[]
	mvCount: number
	mvs: SearchMv[]
}

export interface SearchMv extends MvData {
	alg: string
	arTransName: string
	mark: number
}
