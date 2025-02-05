import type { Artist } from '@/types/playlist'
import type { Album } from '@/types/album'

/**
 * 新歌速递
 */
export interface NewSongs {
	data: Daum[]
	code: number
}

export interface Daum {
	starred: boolean
	popularity: number
	starredNum: number
	playedNum: number
	dayPlays: number
	hearTime: number
	mp3Url: string
	st: number
	exclusive: boolean
	artists: Artist[]
	album: Album
	commentThreadId: string
	mvid: number
	fee: number
	score: number
	rtype: number
	copyrightId: number
	ftype: number
	copyFrom: string
	ringtone: string
	disc: string
	no: number
	position: number
	alias: string[]
	duration: number
	status: number
	name: string
	id: number
	transNames?: string[]
}
