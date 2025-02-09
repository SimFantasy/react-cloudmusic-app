import React from 'react'

import { ARTIST_CATEGORY } from '@/config'
import { cn, sortNumberArray, sortLettersArray } from '@/lib/utils'
import type { ArtistCategory } from '@/types/artist'

type ArtistCategoriesProps = {
	urlState: ArtistCategory
	setUrlState: (state: React.SetStateAction<ArtistCategory>) => void
}

export const ArtistCategories: React.FC<ArtistCategoriesProps> = ({ urlState, setUrlState }) => {
	return (
		<div className='flex-y-4'>
			<AreaCategories urlState={urlState} setUrlState={setUrlState} />
			<TypeCategories urlState={urlState} setUrlState={setUrlState} />
			<InitialCategories urlState={urlState} setUrlState={setUrlState} />
		</div>
	)
}

const AreaCategories = ({ urlState, setUrlState }: ArtistCategoriesProps) => {
	return (
		<div className='flex-x-2'>
			<button
				className={cn('category-link', {
					active: urlState?.area === undefined
				})}
				onClick={() => setUrlState({ area: undefined })}
			>
				全部
			</button>
			{sortNumberArray(Object.keys(ARTIST_CATEGORY.area).map(k => Number(k))).map(k => (
				<button
					key={k}
					onClick={() => setUrlState({ area: k.toString() })}
					className={cn('category-link', { active: urlState?.area === k.toString() })}
				>
					{ARTIST_CATEGORY.area[k.toString() as keyof typeof ARTIST_CATEGORY.area]}
				</button>
			))}

			<button
				className={cn('category-link', {
					active: urlState?.area === '0'
				})}
				onClick={() => setUrlState({ area: '0' })}
			>
				其他
			</button>
		</div>
	)
}

const TypeCategories = ({ urlState, setUrlState }: ArtistCategoriesProps) => {
	return (
		<div className='flex-x-2'>
			<button
				onClick={() => setUrlState({ type: undefined })}
				className={cn('category-link', { active: urlState?.type === undefined })}
			>
				全部
			</button>
			{sortNumberArray(Object.keys(ARTIST_CATEGORY.type).map(k => Number(k))).map(k => (
				<button
					key={k}
					onClick={() => setUrlState({ type: k.toString() })}
					className={cn('category-link', { active: urlState?.type === k.toString() })}
				>
					{ARTIST_CATEGORY.type[k.toString() as keyof typeof ARTIST_CATEGORY.type]}
				</button>
			))}
		</div>
	)
}

const InitialCategories = ({ urlState, setUrlState }: ArtistCategoriesProps) => {
	return (
		<div className='flex-x-2 gap-2 flex-wrap'>
			<button
				onClick={() => setUrlState({ initial: undefined })}
				className={cn('letters-category', {
					active: urlState?.initial === undefined
				})}
			>
				热门
			</button>
			{sortLettersArray(Object.keys(ARTIST_CATEGORY.initial).map(k => k)).map(k => (
				<button
					key={k}
					onClick={() => setUrlState({ initial: k.toString() })}
					className={cn('letters-category', { active: urlState?.initial === k.toString() })}
				>
					{ARTIST_CATEGORY.initial[k.toString() as keyof typeof ARTIST_CATEGORY.initial]}
				</button>
			))}
			<button
				onClick={() => setUrlState({ initial: '0' })}
				className={cn('letters-category', {
					active: urlState?.initial === '0'
				})}
			>
				#
			</button>
		</div>
	)
}
