import React from 'react'

import { cn, sortLettersArray } from '@/lib/utils'
import { NEWALBUM_AREA } from '@/config'

type AlbumCategoriesProps = {
	urlState?: { area?: string }
	setUrlState: (state: React.SetStateAction<{ area?: string }>) => void
}

export const AlbumCategories: React.FC<AlbumCategoriesProps> = ({ urlState, setUrlState }) => {
	return (
		<div className='flex-x-4'>
			<button
				className={cn('category-link', {
					active: urlState?.area === undefined || urlState?.area === 'ALL'
				})}
				onClick={() => setUrlState({ area: undefined })}
			>
				全部
			</button>

			{sortLettersArray(Object.keys(NEWALBUM_AREA).map(k => k)).map(k => (
				<button
					key={k}
					onClick={() => setUrlState({ area: k.toString() })}
					className={cn('category-link', { active: urlState?.area === k.toString() })}
				>
					{NEWALBUM_AREA[k.toString() as keyof typeof NEWALBUM_AREA]}
				</button>
			))}
		</div>
	)
}
