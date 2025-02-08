import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchMvDetail,
	fetchMvUrl,
	fetchMvComments,
	MvCommentsParams,
	fetchMvDynamic
} from '@/service/api/mv'
import type { Comment } from '@/types/comment'
import { SITE } from '@/config'

/**
 * 获取 mv 详情
 */
export const useMvDetail = (mvid: number) => useRequest(() => fetchMvDetail({ mvid }))

/**
 * 获取 mv 动态
 */
export const useMvDynamic = (mvid: number) => useRequest(() => fetchMvDynamic({ mvid }))

/**
 * 获取 mv 下载地址
 */
export const useMvUrl = (id: number, r?: number) => useRequest(() => fetchMvUrl({ id, r }))

/**
 * 获取 mv 评论 无限加载
 */
interface MvCommentResult {
	list: Comment[]
	hotComments: Comment[]
	before: number
	hasMore: boolean
}

const getMvComments = async ({
	id,
	limit,
	offset,
	before
}: MvCommentsParams): Promise<MvCommentResult> => {
	const response = await fetchMvComments({ id, limit, offset, before })
	return {
		list: response.comments,
		before: response.comments[response.comments.length - 1].time,
		hotComments: response.hotComments,
		hasMore: response.more
	}
}

export const useMvCommentsInfinite = ({
	id,
	page,
	before
}: {
	id: number
	page: number
	before?: number
}) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.MV.COMMENT_LIMIT
			const offset = (page - 1) * limit
			return getMvComments({ id, limit, offset, before })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: true
		}
	)
