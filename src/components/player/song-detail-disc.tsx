import discImage from '@/assets/images/disc.png'
import cursorImage from '@/assets/images/disc-cursor.png'
import { cn, thumbnail } from '@/lib/utils'
import { useAudioPlayer } from '@/store/audio-player'

export const SongDetailDisc = () => {
	const { currentTrack, isPlaying } = useAudioPlayer()
	const coverImage = thumbnail(currentTrack?.al.picUrl || '', 1000)
	return (
		<section className='relative flex flex-col items-center justify-center gap-6 w-1/2 h-full'>
			{/* Cursor */}
			<div
				className={cn('absolute z-20 top-16 -right-16 w-60 origin-[48%_0%] trans-all', {
					'rotate-45': isPlaying
				})}
			>
				<img src={cursorImage} />
			</div>

			{/* Disc */}
			<div
				className={cn(
					'relative size-[480px] rounded-full disc-spin',
					isPlaying ? 'disc-run' : 'disc-pause'
				)}
			>
				{/* Cover image */}
				<div className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[240px] rounded-full overflow-hidden opacity-80'>
					<img src={coverImage} alt={currentTrack?.name} className='size-full object-cover' />
				</div>

				{/* Disc image */}
				<div className='absolute z-0 inset-0 size-full rounded-full'>
					<img src={discImage} alt='Disc' className='size-full object-cover' />
				</div>
			</div>
			{/* Track info */}
			<div className='flex-y-4 text-center'>
				<h2 className='text-2xl text-white'>{currentTrack?.name}</h2>
				<div className='text-base text-white/80'>
					{currentTrack?.ar.map(artist => artist.name).join(' / ')}
				</div>
			</div>
		</section>
	)
}
