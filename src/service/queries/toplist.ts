import { useRequest } from 'alova/client'
import { fetchTopLists, fetchTopListsDetail } from '@/service/api/toplist'

// 所有榜单
export const useToplists = () => useRequest(fetchTopLists)

// 歌单详情
export const useToplistDetail = () => useRequest(fetchTopListsDetail)
