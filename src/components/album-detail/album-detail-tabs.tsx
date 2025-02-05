import { cn } from '@/lib/utils'
import { Album } from '@/types/album'

type AlbumDetailTabsProps = {
	album?: Album
	currentTab: string
	setCurrentTab: (tab: string) => void
}

export const AlbumDetailTabs = ({ album, currentTab, setCurrentTab }: AlbumDetailTabsProps) => {
	const tabs = [
		{ name: '歌曲', count: album?.size },
		{ name: '评论', count: album?.info?.commentCount },
		{ name: '专辑详情' }
	]

	return (
		<div className='flex-x-6 my-4'>
			{tabs.map(tab => (
				<div
					key={tab.name}
					onClick={() => setCurrentTab(tab.name)}
					className={cn('flex gap-x-1 text-primary/50 cursor-pointer', {
						'text-primary/80': tab.name === currentTab
					})}
				>
					<h1
						className={cn(
							'relative text-lg after:content-normal after:w-4 after:h-1 after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:bg-blue-500/0 after:rounded-full',
							{
								'after:bg-blue-500': tab.name === currentTab
							}
						)}
					>
						{tab.name}
					</h1>
					<span className='text-xs'>{tab.count}</span>
				</div>
			))}
		</div>
	)
}
