import React from 'react'
import { AudioLines, Check } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'
import { SongLevel } from '@/types/audio-player'

export const SongLevelButton: React.FC = () => {
	const songLevel = useAudioPlayer(state => state.songLevel)
	const setSongLevel = useAudioPlayer(state => state.setSongLevel)

	const LEVELS = [
		{ label: '标准', value: SongLevel.STANDARD },
		{ label: '高品质', value: SongLevel.HIGHER },
		{ label: '极高品质', value: SongLevel.EXHIGH },
		{ label: '无损', value: SongLevel.LOSSLESS },
		{ label: 'Hi-Res', value: SongLevel.HIRES },
		{ label: '高清环绕声', value: SongLevel.JYEFFECT },
		{ label: '沉浸环绕声', value: SongLevel.SKY },
		{ label: '超清母带', value: SongLevel.JYMASTER }
	]
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='player-btn' title='音乐品质'>
					<AudioLines className='player-icon' />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-24'>
				{LEVELS.map((level, index) => (
					<span key={level.label}>
						<DropdownMenuItem
							onClick={() => setSongLevel(level.value)}
							className={cn(
								'flex-x-2 justify-between text-sm text-primary/50 cursor-pointer hover:text-blue-500',
								{ 'bg-blue-100 text-blue-500': songLevel === level.value }
							)}
						>
							<span>{level.label}</span>

							<Check
								className={cn('size-4 text-blue-500 opacity-0', {
									'opacity-100': songLevel === level.value
								})}
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator className={cn(index === LEVELS.length - 1 && 'hidden')} />
					</span>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
