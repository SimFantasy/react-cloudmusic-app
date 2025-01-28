import type { TopLists, TopListsDetail } from '@/types/toplist'
import { http } from '@/service/http'

/**
 * 所有榜单
 */
export const fetchTopLists = () =>
	http.Get('/toplist', {
		transform(data: TopLists) {
			return data.list
		}
	})

/**
 * 所有榜单内容摘要
 */
export const fetchTopListsDetail = () =>
	http.Get('/toplist/detail', {
		transform(data: TopListsDetail) {
			return data.list
		}
	})
