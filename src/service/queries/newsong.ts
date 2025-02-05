import { useRequest } from 'ahooks'
import { NewSongType, fetchNewSongs } from '@/service/api/newsong'

/**
 * 新歌速递
 */
export const useNewSongs = ({ type }: { type?: NewSongType }) =>
	useRequest(() => fetchNewSongs({ type }), {
		refreshDeps: [type]
	})
