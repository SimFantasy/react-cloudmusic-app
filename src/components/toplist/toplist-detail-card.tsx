import { Link } from 'react-router'
import { Play } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { thumbnail } from '@/lib/utils'
import { TopList } from '@/types/toplist'

type ToplistDetailCardProps = {
	toplist: TopList
}

export const ToplistDetailCard: React.FC<ToplistDetailCardProps> = ({ toplist }) => {
	return (
		<Link
			to={`/playlist/${toplist.id}`}
			className='group flex-y-2 p-4 w-full bg-card rounded-lg trans-all shadow-none hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-none'
		>
			<section className='flex-x-4 justify-between'>
				<h1 className='text-lg font-semibold text-primary'>{toplist.name}</h1>
				<span className='text-xs text-primary/50'>{toplist.updateFrequency}</span>
			</section>

			<section className='flex-x-4'>
				<div className='w-20'>
					<AspectRatio ratio={1} className='relative size-20 rounded-lg overflow-hidden'>
						{/* Overlay */}
						<div className='absolute inset-0 z-10 flex-center size-full bg-transparent trans-all group-hover:bg-blue-950/60'>
							<Play className='size-5 fill-white stroke-white trans-all opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100' />
						</div>

						{/* Cover image */}
						<img
							src={thumbnail(toplist.coverImgUrl, 200)}
							alt={toplist.name}
							className='size-full object-cover'
						/>
					</AspectRatio>
				</div>

				<div className='flex-1 flex-y-2 w-full'>
					{toplist.tracks.map((t, i) => (
						<div key={i} className='flex-x-2 text-sm '>
							<span className='text-primary/80'>{i + 1}</span>
							<div className='text-sm text-primary'>{t.first}</div>
							<div className='text-xs text-primary/50'>{t.second}</div>
						</div>
					))}
				</div>
			</section>
		</Link>
	)
}
