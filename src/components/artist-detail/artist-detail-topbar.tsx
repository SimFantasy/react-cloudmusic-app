import { Artist } from '@/types/artist'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { thumbnail } from '@/lib/utils'
import { Button } from '../ui/button'
import { Play, Plus } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

type ArtistDetailTopbarProps = {
	artist?: Artist
	loading: boolean
}

export const ArtistDetailTopbar = ({ artist, loading }: ArtistDetailTopbarProps) => {
	return (
		<>
			{loading ? (
				<div className='grid grid-cols-[13rem,1fr]'>
					<div className='w-52 h-44'>
						<Skeleton className='size-44 rounded-full' />
					</div>
					<div className='flex-y-4 justify-between'>
						<div className='flex-y-2'>
							<Skeleton className='w-40 h-4 rounded-lg' />
							<Skeleton className='w-24 h-4 rounded-lg' />
						</div>
						<div className='flex-x-4'>
							<Skeleton className='w-24 h-10 rounded-lg' />
							<Skeleton className='w-20 h-10 rounded-lg' />
						</div>
					</div>
				</div>
			) : (
				<div className='grid grid-cols-[13rem,1fr]'>
					<div className='w-52 h-44'>
						<AspectRatio ratio={1} className='size-44 rounded-full overflow-hidden'>
							<img
								src={thumbnail(artist?.cover || '', 240)}
								alt={artist?.name}
								className='size-full object-cover'
							/>
						</AspectRatio>
					</div>
					<div className='flex-y-4 justify-between'>
						<div className='flex-y-2'>
							<h1 className='text-xl text-primary/80 font-semibold'>{artist?.name}</h1>
							<div className='text-sm text-primary/50'>{artist?.alias.join(' / ')}</div>
						</div>

						<div className='flex-x-4'>
							<Button className='play-all-button'>
								<Play className='size-5 fill-white stroke-white' />
								<span>播放全部</span>
							</Button>

							<Button variant='outline' className='button-free px-4 py-2 text-primary/50'>
								<Plus className='size-5' />
								<span>关注</span>
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
