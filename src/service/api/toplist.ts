/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TopLists, TopList, TopListsDetail } from '@/types/toplist'
import { fetcher } from '@/service/fetcher'

/**
 * 所有榜单
 */
export const fetchTopLists = async (): Promise<TopList[]> => {
	const response = await fetcher<any, TopLists>({
		method: 'GET',
		url: '/toplist'
	})
	return response.list
}

/**
 * 所有榜单内容摘要
 */
export const fetchTopListsDetail = async (): Promise<TopList[]> => {
	const response = await fetcher<any, TopListsDetail>({
		method: 'GET',
		url: '/toplist/detail'
	})
	return response.list || []
}
