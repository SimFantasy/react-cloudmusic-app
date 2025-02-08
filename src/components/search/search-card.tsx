import { Link } from 'react-router'
import { Play } from 'lucide-react'

import { SearchCardSkeleton } from '@/components/search/search-card-skeleton'

import { cn } from '@/lib/utils'

type SearcCardProps = {
	link: string
	image: string
	imageType: 'circle' | 'square'
	title: string
	info: string[]
	loading: boolean
}

export const SearchCard = ({
	link,
	image,
	imageType = 'circle',
	title,
	info,
	loading
}: SearcCardProps) => {
	return (
		<>
			{loading ? (
				<SearchCardSkeleton />
			) : (
				<Link
					to={link}
					className='group grid grid-cols-[auto,1fr] items-center gap-x-4 p-4  bg-transparent rounded-lg trans-all hover:bg-blue-100'
				>
					<section
						className={cn('relative size-16 border border-border overflow-hidden', {
							'rounded-full': imageType === 'circle',
							'rounded-lg': imageType === 'square'
						})}
					>
						<div className='absolute z-10 inset-0 flex-center size-full bg-blue-950/0 trans-all group-hover:bg-blue-950/60'>
							<Play className='size-5 fill-white stroke-white trans-all opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' />
						</div>
						<img src={image} alt={title} className='size-full object-cover' />
					</section>

					<section className='grid grid-rows-[auto,1fr] gap-y-2'>
						<h2 className='text-lg font-semibold text-primary/80'>{title}</h2>
						<div className='flex-x-4'>
							{info.map((item, index) => (
								<span key={index} className='text-sm text-primary/40'>
									{item}
								</span>
							))}
						</div>
					</section>
				</Link>
			)}
		</>
	)
}
