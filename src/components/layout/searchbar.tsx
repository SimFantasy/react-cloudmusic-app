import { useDeferredValue, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { CircleX, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Searchbar = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q')

	const [keyword, setKeyword] = useState('')
	const deferredKeyword = useDeferredValue(keyword)

	useEffect(() => {
		if (query) {
			setKeyword(query)
		}
	}, [query])

	const handleSubmit = () => {
		if (deferredKeyword) {
			navigate(`/search?q=${deferredKeyword}`)
		}
	}
	return (
		<form
			onSubmit={handleSubmit}
			className='group flex-x-1 w-80 h-9 border border-border bg-blue-500/0 rounded-md trans-colors hover:border-blue-200 hover:bg-blue-500/10'
		>
			<button className='flex-center w-7 h-full text-primary/40 group-hover:text-blue-500'>
				<Search className='size-4' />
			</button>
			<input
				type='text'
				name='q'
				placeholder='歌单、歌手、专辑...'
				className='flex-1 size-full border-none outline-none bg-transparent text-sm text-primary/80 placeholder-primary/30'
				value={deferredKeyword}
				onChange={e => setKeyword(e.target.value)}
				autoComplete='off'
			/>
			<button
				className={cn('group/btn w-7 h-full cursor-pointer', {
					hidden: !keyword || keyword.trim() === '',
					'flex-center': keyword && keyword.trim() !== ''
				})}
				type='button'
				onClick={() => setKeyword('')}
			>
				<CircleX className='size-5 stroke-white fill-primary/30 group-hover/btn:fill-primary/50' />
			</button>
		</form>
	)
}
