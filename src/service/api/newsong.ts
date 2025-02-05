/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NewSongs, Daum } from '@/types/newsong'
import { fetcher } from '@/service/fetcher'

/**
 * 新歌速递
 * 调用此接口 , 可获取新歌速递
 */
export type NewSongType = '0' | '7' | '8' | '16' | '96'
export const fetchNewSongs = async ({ type }: { type?: NewSongType }): Promise<Daum[]> => {
	const response = await fetcher<any, NewSongs>({
		method: 'GET',
		url: '/top/song',
		params: { type }
	})

	return response.data || []
}
