/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AlbumDetail, AllNewAlbums, AlbumComment } from '@/types/album'
import { fetcher } from '@/service/fetcher'

/**
 * 获取专辑详情
 * 调用此接口 , 传入专辑 id, 可获得专辑内容
 */
export const fetchAlbumDetail = async ({ id }: { id: number }): Promise<AlbumDetail> => {
	const response = await fetcher<any, AlbumDetail>({
		method: 'GET',
		url: '/album',
		params: { id }
	})

	return response || {}
}

/**
 * 全部新碟
 * 调用此接口 , 可获取全部新碟
 * @param option limit : 返回数量 , 默认为 30
 * @param option offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param option area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 */
export type AllNewAlbumsParams = { limit?: number; offset?: number; area?: string }
export const fetchAllNewAlbums = async ({ limit, offset, area = 'ALL' }: AllNewAlbumsParams) => {
	const response = await fetcher<any, AllNewAlbums>({
		method: 'GET',
		url: '/album/new',
		params: { limit, offset, area }
	})
	return response || {}
}

/**
 * 专辑评论
 * 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
 * @param id 专辑 id
 * @param option limit: 取出评论数量 , 默认为 20
 * @param option offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param option before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 */

export type AlbumCommentsParams = { id: number; limit?: number; offset?: number; before?: number }
export const fetchAlbumComments = async ({
	id,
	limit,
	offset,
	before
}: AlbumCommentsParams): Promise<AlbumComment> => {
	const response = await fetcher<any, AlbumComment>({
		method: 'GET',
		url: '/comment/album',
		params: { id, limit, offset, before }
	})
	return response || {}
}
