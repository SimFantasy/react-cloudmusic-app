import { cn } from '@/lib/utils'
import { Artist } from '@/types/artist'

type ArtistDetailTabsProps = {
	artist?: Artist
	loading: boolean
	currentTab: string
	setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

export const ArtistDetailTabs = ({
	artist,
	loading,
	currentTab,
	setCurrentTab
}: ArtistDetailTabsProps) => {
	const tabs = [
		{ name: '歌曲', count: artist?.musicSize },
		{ name: '专辑', count: artist?.albumSize },
		{ name: 'MV', count: artist?.mvSize },
		{ name: '歌手详情' }
	]
	return (
		<div className='flex-x-4 my-6'>
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
					{tab.count && <span className='text-xs'>{tab.count}</span>}
				</div>
			))}
		</div>
	)
}
