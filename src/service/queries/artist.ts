import { useRequest, useInfiniteScroll } from 'ahooks'
import { fetchArtists } from '@/service/api/artist'
import type { ArtistsParams } from '@/service/api/artist'
import type { Artist } from '@/types/artist'
import { SITE } from '@/config'

/**
 * 获取歌手分类列表 无限加载
 */
interface ArtistsResult {
	list: Artist[]
	hasMore: boolean
}

const getArtists = async ({
	initial,
	type,
	area,
	limit,
	offset
}: ArtistsParams): Promise<ArtistsResult> => {
	const response = await fetchArtists({ limit, offset, initial, type, area })
	return {
		list: response.artists,
		hasMore: response.more
	}
}

export const useArtistsInfinite = ({
	initial = '-1',
	type = -1,
	area = -1,
	page
}: {
	initial?: string
	type?: number
	area?: number
	page: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ARTIST.LIMIT
			const offset = (page - 1) * limit
			return getArtists({ initial, type, area, limit, offset })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [initial, type, area],
			manual: false
		}
	)
