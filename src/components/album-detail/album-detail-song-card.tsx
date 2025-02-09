import { cn, formatDuration } from '@/lib/utils'
import { Song } from '@/types/playlist'
import { CirclePlay, ListPlus } from 'lucide-react'

type AlbumDetailSongCardProps = {
	song: Song
	index: number
}

export const AlbumDetailSongCard: React.FC<AlbumDetailSongCardProps> = ({ song, index }) => {
	return (
		<div
			className={cn(
				'group grid grid-cols-[auto,1fr,0.5fr,auto] gap-2 items-center p-2 rounded-lg text-sm text-primary/50 hover:bg-blue-500/10',
				{
					'bg-blue-500/5': index % 2 === 0
				}
			)}
		>
			<div className='w-10'>{index < 9 ? '0' + (index + 1) : index + 1}</div>
			<div className='flex-y-1'>
				<h1 className='text-sm text-primary/80'>{song.name}</h1>
				<span className='text-xs'>{song.ar.map(a => a.name).join('/')}</span>
			</div>
			<div>{formatDuration(song.dt)}</div>
			<div className='flex-end gap-x-2'>
				<button className='p-2 text-primary/50 hover:text-blue-500 trans-all opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'>
					<ListPlus className='size-5' />
				</button>

				<button className='p-2 text-primary/50 hover:text-blue-500 trans-all opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'>
					<CirclePlay className='size-5' />
				</button>
			</div>
		</div>
	)
}
