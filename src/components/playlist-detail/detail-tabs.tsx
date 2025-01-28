import { cn } from '@/lib/utils'

type DetailTabsProps = {
	currentTab: string
	setCurrentTab: (tab: string) => void
	counts: {
		trackCount?: number
		commentCount?: number
		subscribedCount?: number
	}
}

export const DetailTabs = ({ currentTab, setCurrentTab, counts }: DetailTabsProps) => {
	const tags = [
		{ name: '歌曲', count: counts.trackCount },
		{ name: '评论', count: counts.commentCount },
		{ name: '收藏', count: counts.subscribedCount }
	]

	return (
		<div className='flex-x-6 my-4'>
			{tags.map(tag => (
				<div
					key={tag.name}
					onClick={() => setCurrentTab(tag.name)}
					className={cn('flex gap-x-1 text-primary/50 cursor-pointer', {
						'text-primary/80': tag.name === currentTab
					})}
				>
					<h1
						className={cn(
							'relative text-lg after:content-normal after:w-4 after:h-1 after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:bg-blue-500/0 after:rounded-full',
							{
								'after:bg-blue-500': tag.name === currentTab
							}
						)}
					>
						{tag.name}
					</h1>
					<span className='text-xs'>{tag.count}</span>
				</div>
			))}
		</div>
	)
}
