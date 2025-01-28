'use client'

import { useSearchParams } from 'next/navigation'

import { Loader } from '@/components/common/loader'
import { QueryLink } from '@/components/common/query-link'
import { PlaylistCategories } from '@/components/playlist/playlist-categories'

import { useHotCategories } from '@/service/queries/playlist'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'

export const PlaylistHotCategories = () => {
	const searchParams = useSearchParams()
	const currentCat = searchParams.get('cat') || '全部'
	const { data, loading } = useHotCategories()

	const { isScrolled } = useScrolled()

	return (
		<div
			className={cn('py-2 w-full trans-all duration-150 linear bg-card/0 backdrop-blur-none', {
				'sticky top-16 right-0 left-0 z-[500] bg-card/95 backdrop-blur-sm py-4 border-t border-border':
					isScrolled
			})}
		>
			<div className='page-wrapper page-container flex-start flex-wrap gap-2 col-span-24'>
				<QueryLink
					query={{}}
					className={cn('category-link', {
						active: currentCat === '全部'
					})}
				>
					全部
				</QueryLink>

				{loading ? (
					<Loader />
				) : (
					data?.map(category => (
						<QueryLink
							key={category.id}
							query={{ cat: category.name }}
							className={cn('category-link', {
								active: currentCat === category.name
							})}
						>
							{category.name}
						</QueryLink>
					))
				)}

				<PlaylistCategories />
			</div>
		</div>
	)
}
