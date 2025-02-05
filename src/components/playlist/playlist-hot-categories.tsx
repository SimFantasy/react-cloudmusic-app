import useUrlState from '@ahooksjs/use-url-state'

import { Loader } from '@/components/common/loader'
import { PlaylistCategories } from '@/components/playlist/playlist-categories'

import { useHotCategories } from '@/service/queries/playlist'
import { useMainScrolled } from '@/hooks/use-main-scrolled'
import { cn } from '@/lib/utils'

export const PlaylistHotCategories = () => {
	const { data, loading } = useHotCategories()

	const [catState, setCatState] = useUrlState<{ cat?: string }>(undefined)

	const { isScrolled } = useMainScrolled()

	return (
		<div
			className={cn('pt-4 w-full trans-all duration-150 linear bg-card/0 backdrop-blur-none', {
				'sticky top-0 right-0 left-0 z-[500] bg-card/95 backdrop-blur-sm py-4 border-t border-border shadow-md':
					isScrolled
			})}
		>
			<div className='page-wrapper page-container flex-start flex-wrap gap-2 col-span-24'>
				<button
					onClick={() => setCatState({ cat: undefined })}
					className={cn('category-link', {
						active: catState.cat === undefined
					})}
				>
					全部
				</button>

				{loading ? (
					<Loader />
				) : (
					data?.map((category, index) => (
						<button
							key={category.id + index}
							onClick={() => setCatState({ cat: category.name })}
							className={cn('category-link', {
								active: catState?.cat === category.name
							})}
						>
							{category.name}
						</button>
					))
				)}

				<PlaylistCategories />
			</div>
		</div>
	)
}
