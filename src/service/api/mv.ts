/* eslint-disable @typescript-eslint/no-explicit-any */
import { MvDetail, MvUrl, MvData, UrlData, MvDynamic } from '@/types/mv'
import { Comments } from '@/types/comment'
import { fetcher } from '@/service/fetcher'

/**
 * 获取 mv 详情
 * @param mvid: mv 的 id
 */
type MvDetailParams = { mvid: number }

export const fetchMvDetail = async ({ mvid }: MvDetailParams): Promise<MvData> => {
	const response = await fetcher<any, MvDetail>({
		method: 'GET',
		url: '/mv/detail',
		params: { mvid }
	})

	return response.data || {}
}

/**
 * 获取 mv 点赞转发评论数数据
 */
type MvDetailData = { mvid: number }
export const fetchMvDynamic = async ({ mvid }: MvDetailData): Promise<MvDynamic> => {
	const response = await fetcher<any, MvDynamic>({
		method: 'GET',
		url: '/mv/detail/info',
		params: { mvid }
	})
	return response || {}
}

/**
 * 获取 mv 地址
 * @param id: mv id
 * @param 可选参数 r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 */
type MvUrlParams = { id: number; r?: number }

export const fetchMvUrl = async ({ id, r }: MvUrlParams): Promise<UrlData> => {
	const response = await fetcher<any, MvUrl>({
		method: 'GET',
		url: '/mv/url',
		params: { id, r }
	})
	return response.data || {}
}

/**
 * 获取Mv评论
 * @param id: mv id
 * @param 可选参数 limit: 取出评论数量 , 默认为 20
 * @param 可选参数 offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param 可选参数 before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 */
export type MvCommentsParams = { id: number; limit?: number; offset?: number; before?: number }

export const fetchMvComments = async ({
	id,
	limit = 20,
	offset = 0,
	before = 0
}: MvCommentsParams): Promise<Comments> => {
	const response = await fetcher<any, Comments>({
		method: 'GET',
		url: '/comment/mv',
		params: { id, limit, offset, before }
	})
	return response || {}
}
