import { useRequest, useInfiniteScroll } from 'ahooks'
import {
	fetchAllNewAlbums,
	fetchAlbumDetail,
	fetchAlbumComments,
	type AllNewAlbumsParams,
	type AlbumCommentsParams
} from '@/service/api/album'
import { SITE } from '@/config'
import type { Album } from '@/types/album'
import type { Comment } from '@/types/comment'

/**
 * 全部新碟 无限加载
 */
interface AllNewAlbumsResult {
	list: Album[]
	hasMore: boolean
}

const getAllNewAlbums = async ({
	limit = SITE.ALBUM.ALBUM_LIMIT,
	offset = 0,
	area
}: AllNewAlbumsParams): Promise<AllNewAlbumsResult> => {
	const response = await fetchAllNewAlbums({ limit, offset, area })
	return {
		list: response.albums || [],
		hasMore: response.code === 200 || limit + offset < response.total
	}
}

export const useAllNewAlbumsInfinite = ({ page, area }: { page: number; area?: string }) =>
	useInfiniteScroll(
		() => {
			const limit = SITE.ALBUM.ALBUM_LIMIT
			const offset = (page - 1) * limit
			return getAllNewAlbums({ limit, offset, area })
		},
		{
			isNoMore: d => d?.hasMore === false,
			reloadDeps: [area],
			manual: true
		}
	)

/**
 * 专辑详情
 */
export const useAlbumDetail = ({ id }: { id: number }) => useRequest(() => fetchAlbumDetail({ id }))

/**
 * 专辑评论 无限加载
 */
interface AlbumCommentResult {
	list: Comment[]
	hotComments: Comment[]
	before: number
	hasMore: boolean
}

const getAlbumComments = async ({
	id,
	limit,
	offset,
	before
}: AlbumCommentsParams): Promise<AlbumCommentResult> => {
	const response = await fetchAlbumComments({ id, limit, offset, before })
	return {
		list: response.comments,
		before: response.comments[response.comments.length - 1].time,
		hotComments: response.hotComments,
		hasMore: response.more
	}
}

export const useAlbumCommentsInfinite = ({
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
			const limit = SITE.ALBUM.COMMENT_LIMIT
			const offset = (page - 1) * limit
			return getAlbumComments({ id, limit, offset, before })
		},
		{
			isNoMore: d => d?.hasMore === false,
			manual: true
		}
	)
