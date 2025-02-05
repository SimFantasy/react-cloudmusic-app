import { ChevronsUpDown } from 'lucide-react'
import { useNavigate } from 'react-router'

import { useAudioPlayer } from '@/store/audio-player'
import { formatTime } from '@/lib/utils'

export const PlayerTrackInfo = () => {
	const navigate = useNavigate()
	const { currentTrack, currentTime, duration } = useAudioPlayer()

	const handleClickTrackDetail = () => {
		if (currentTrack) {
			navigate('/song-detail')
		}
	}
	return (
		<section className='flex-x-4'>
			<div className='group/cover relative size-12 rounded-md overflow-hidden cursor-pointer'>
				<div
					onClick={handleClickTrackDetail}
					className='absolute z-10 inset-0 flex-center size-full bg-transparent opacity-0 text-white trans-all group-hover/cover:opacity-100 group-hover/cover:bg-blue-950/60'
				>
					<ChevronsUpDown className='size-5' />
				</div>
				<img src={currentTrack?.al.picUrl} className='size-full object-cover' />
			</div>

			<div className='flex-y-1'>
				<h2 className='flex-x-2 line-clamp-1'>
					<span className='text-sm text-primary/80'>{currentTrack?.name}</span>
					<span className='text-xs text-primary/50'>{currentTrack?.al.name}</span>
				</h2>
				<div className='flex-x-4 text-xs text-primary/50'>
					<span className='flex-x-2'>{currentTrack?.ar.map(a => a.name).join(' / ')}</span>
					<span>
						{formatTime(currentTime)} / {formatTime(duration)}
					</span>
				</div>
			</div>
		</section>
	)
}
