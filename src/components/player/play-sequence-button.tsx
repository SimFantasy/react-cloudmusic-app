import React from 'react'
import { Repeat, Repeat1, Shuffle } from 'lucide-react'

import { useAudioPlayer } from '@/store/audio-player'
import { PlaySequence } from '@/types/audio-player'

export const PlaySequenceButton: React.FC = () => {
	const playSequence = useAudioPlayer(state => state.playSequence)
	const setPlaySequence = useAudioPlayer(state => state.setPlaySequence)

	const sequenceIcon = {
		[PlaySequence.LIST_LOOP]: <Repeat className='player-icon !size-4' />,
		[PlaySequence.SINGLE_LOOP]: <Repeat1 className='player-icon !size-4' />,
		[PlaySequence.SHUFFLE]: <Shuffle className='player-icon !size-4' />
	}

	const handleChangePlaySequence = () => {
		const newSequence = (playSequence + 1) % 3
		setPlaySequence(newSequence)
	}
	return (
		<button className='player-btn' onClick={handleChangePlaySequence}>
			{sequenceIcon[playSequence as PlaySequence]}
		</button>
	)
}
