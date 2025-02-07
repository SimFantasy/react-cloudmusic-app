import { VolumeX, Volume2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { useAudioPlayer } from '@/store/audio-player'

export const VolumeButton = () => {
	const volume = useAudioPlayer(state => state.volume)
	const setVolume = useAudioPlayer(state => state.setVolume)

	const handleToggleMute = () => {
		setVolume(volume === 0 ? 1 : 0)
	}
	return (
		<div className='flex-x-2 grid grid-cols-[2.5rem,1fr] w-32'>
			<button className='player-btn' onClick={handleToggleMute}>
				{volume === 0 ? <VolumeX className='player-icon' /> : <Volume2 className='player-icon' />}
			</button>

			<Slider
				max={1}
				step={0.1}
				value={[volume]}
				onValueChange={(value: number[]) => setVolume(value[0])}
			/>
		</div>
	)
}
