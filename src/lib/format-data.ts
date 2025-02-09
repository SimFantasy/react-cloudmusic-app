import { Daum } from '@/types/newsong'
import { Track } from '@/types/playlist'
import { NewSong } from '@/types/discover'

export const formatDaumsToTracks = (songs: Daum[] | undefined): Track[] | undefined =>
	songs?.map((s, i) => ({
		id: s.id,
		dt: s.duration,
		al: {
			...s.album,
			picUrl: s.album.picUrl ?? '',
			id: s.album.id ?? i,
			name: s.album.name ?? '',
			publishTime: s.album.publishTime ?? 0
		},
		ar: s.artists,
		mv: s.mvid,
		name: s.name,
		cp: 0,
		publishTime: s.album.publishTime
	}))

export const formatDaumToTrack = (s: Daum): Track => ({
	id: s.id,
	dt: s.duration,
	al: {
		...s.album,
		picUrl: s.album?.picUrl ?? '',
		id: s.album?.id ?? 0,
		name: s.album?.name ?? ''
	},
	ar: s.artists,
	mv: s.mvid,
	name: s.name,
	cp: 0,
	publishTime: s.album?.publishTime
})

export const formatNewSongToTrack = (s: NewSong): Track => ({
	id: s?.id,
	name: s?.name,
	dt: s?.duration,
	mv: s?.mvid,
	cp: s?.fee,
	al: {
		...s?.album,
		picUrl: s?.album?.picUrl ?? '',
		id: s?.album?.id ?? 0,
		name: s?.album?.name ?? ''
	},
	ar: s?.artists,
	publishTime: s?.album?.publishTime
})
