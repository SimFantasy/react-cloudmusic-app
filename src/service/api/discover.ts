import { http } from '@/service/http'

import type { PersonalizedPlaylist, PersonalizedNewSong } from '@/types/discover'
import { SITE } from '@/config'

/**
 * 获取推荐歌单
 * @param limit: 取出数量 , 默认为 30 (不支持 offset)
 */

export const fetchDiscoverPlaylist = () =>
	http.Get('/personalized', {
		params: { limit: SITE.DISCOVER.PLAYLIST_LIMIT },
		transform(data: PersonalizedPlaylist) {
			return data.result
		}
	})

/**
 * 获取最新歌曲
 * @param limit: 取出数量 , 默认为 10 (不支持 offset)
 */
export const fetchDiscoverNewSong = () =>
	http.Get('/personalized/newsong', {
		params: { limit: SITE.DISCOVER.NEWSONG_LIMIT },
		transform(data: PersonalizedNewSong) {
			return data.result
		}
	})
