import { Link } from 'react-router'
import { Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { cn, thumbnail } from '@/lib/utils'
import { TopList } from '@/types/toplist'

type ToplistCardProps = {
	toplist: TopList
	p?: 0 | 1 | 2 | 3
}
export const ToplistCard = ({ toplist, p = 1 }: ToplistCardProps) => {
	return (
		<Link to={`/playlist/${toplist.id}`} className='group w-full'>
			<AspectRatio ratio={1} className='relative w-full'>
				{/* Play button */}
				<button className='absolute right-4 bottom-4 z-20 flex-center size-10 rounded-full bg-white/80 backdrop-blur-sm trans-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'>
					<Play className='size-5 fill-sky-500 stroke-sky-500' />
				</button>

				{/* Update frequency */}
				<div className='absolute inset-0 z-10 flex-center bg-transparent'>
					<span
						className={cn('text-sm text-white', {
							hidden: p === 0,
							'translate-y-8': p === 1,
							'translate-y-10': p === 2,
							'translate-y-12': p === 3
						})}
					>
						{toplist.updateFrequency}
					</span>
				</div>

				{/* Cover image */}
				<img
					src={thumbnail(toplist.coverImgUrl, 320)}
					alt={toplist.name}
					className='size-full object-cover rounded-lg'
				/>
			</AspectRatio>
		</Link>
	)
}
