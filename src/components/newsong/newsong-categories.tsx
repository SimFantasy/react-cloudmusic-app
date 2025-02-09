import React from 'react'

import { NEWSONG_TYPE } from '@/config'
import { cn, sortNumberArray } from '@/lib/utils'

type NewsongCategoriesProps = {
	urlState?: { type?: string }
	setUrlState: (state: React.SetStateAction<{ type?: string }>) => void
}

export const NewsongCategories: React.FC<NewsongCategoriesProps> = ({ urlState, setUrlState }) => {
	return (
		<div className='flex-x-2'>
			<button
				onClick={() => setUrlState({ type: undefined })}
				className={cn('category-link', {
					active: urlState?.type === undefined || urlState?.type === '0'
				})}
			>
				全部
			</button>
			{sortNumberArray(Object.keys(NEWSONG_TYPE).map(k => Number(k))).map(k => (
				<button
					key={k}
					onClick={() => setUrlState({ type: k.toString() })}
					className={cn('category-link', { active: urlState?.type === k.toString() })}
				>
					{NEWSONG_TYPE[k.toString() as keyof typeof NEWSONG_TYPE]}
				</button>
			))}
		</div>
	)
}
