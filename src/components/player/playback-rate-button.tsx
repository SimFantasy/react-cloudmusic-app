import { Check, Gauge } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'

import { PlaybackRate } from '@/types/audio-player'

export const PlaybackRateButton = () => {
	const playbackRate = useAudioPlayer(state => state.playbackRate)
	const setPlaybackRate = useAudioPlayer(state => state.setPlaybackRate)

	const RATES = [
		{ label: '0.5x', value: PlaybackRate.SLOWER },
		{ label: '0.75x', value: PlaybackRate.SLOW },
		{ label: '1x', value: PlaybackRate.NORMAL },
		{ label: '1.25x', value: PlaybackRate.FAST },
		{ label: '1.5x', value: PlaybackRate.FASTER },
		{ label: '2x', value: PlaybackRate.FASTEST },
		{ label: '3x', value: PlaybackRate.TRIPLE },
		{ label: '4x', value: PlaybackRate.QUADRUPLE }
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<div className='player-btn justify-start gap-x-2 w-16' title='播放速度'>
					<Gauge className='player-icon !size-4' />
					<span className='text-xs text-primary/40'>{playbackRate}x</span>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-24'>
				{RATES.map((rate, index) => (
					<span key={rate.label}>
						<DropdownMenuItem
							onClick={() => setPlaybackRate(rate.value)}
							className={cn(
								'flex-x-2 justify-between text-sm text-primary/50 cursor-pointer hover:text-blue-500',
								{
									'bg-blue-100 text-blue-500': playbackRate === rate.value
								}
							)}
						>
							<span>{rate.label}</span>

							<Check
								className={cn('size-4 text-blue-500 opacity-0', {
									'opacity-100': playbackRate === rate.value
								})}
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator className={cn(index === RATES.length - 1 && 'hidden')} />
					</span>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
