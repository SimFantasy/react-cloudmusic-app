import { useParams } from 'react-router'
import { FolderPlus, SquareArrowOutUpRight, ThumbsUp } from 'lucide-react'

import { MvPlayer } from '@/components/mv-detail/mv-player'
import { UserAvatar } from '@/components/common/user-avatar'
import { MvDetailComment } from '@/components/mv-detail/mv-detail-comment'

import { useMvDetail, useMvDynamic } from '@/service/queries/mv'
import { formatDate, thumbnail } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const MvDetail: React.FC = () => {
	const { mvId } = useParams<{ mvId: string }>()

	const { data: mvDetail } = useMvDetail(Number(mvId))
	const { data: mvDynamic } = useMvDynamic(Number(mvId))

	const mvInfo = [
		{
			title: '点赞',
			value: mvDynamic?.likedCount || 0,
			icon: ThumbsUp
		},
		{
			title: '收藏',
			value: mvDetail?.subCount || 0,
			icon: FolderPlus
		},
		{
			title: '分享',
			value: mvDynamic?.shareCount || 0,
			icon: SquareArrowOutUpRight
		}
	]

	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				{/* Player */}
				<MvPlayer mvid={Number(mvId)} br={mvDetail?.brs[mvDetail?.brs.length - 1].br} />

				{/* Info */}
				<section className='flex-y-4'>
					<h2 className='text-xl font-semibold text-primary/80'>{mvDetail?.name}</h2>

					<div className='flex-y-4'>
						<div className='flex-x-4'>
							<UserAvatar
								image={thumbnail(mvDetail?.artists[0].img1v1Url || '', 80)}
								name={mvDetail?.artistName}
								size='lg'
							/>

							<span className='text-sm text-primary/50'>{mvDetail?.artists[0].name}</span>
						</div>

						<div className='flex-x-4 justify-between text-xs text-primary/50'>
							<div className='flex-x-2'>
								<span>发布时间：{formatDate(mvDetail?.publishTime || '', 'YYYY-MM-DD')}</span>
								<span>播放：{mvDetail?.playCount}</span>
							</div>

							<div className='flex-end gap-x-4'>
								{mvInfo.map(item => {
									const Icon = item.icon
									return (
										<div
											key={item.title}
											className='flex-x-2 text-sm text-primary/50 hover:text-primary/80'
										>
											<span>{item.value}</span>
											<Icon className='size-4' />
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>

				<Separator className='my-4' />

				{/* Comments */}
				<MvDetailComment mvid={Number(mvId)} />
			</div>
		</div>
	)
}

export default MvDetail
