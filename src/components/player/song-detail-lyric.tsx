import { useRef, useEffect } from 'react'

import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'

export const SongDetailLyric: React.FC = () => {
	const { currentTrack, currentTime, currentLyric, currentLyricIndex } = useAudioPlayer()
	const lyricRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const active = lyricRef.current?.querySelector('.active') as HTMLParagraphElement
		if (lyricRef.current && currentTrack) {
			lyricRef.current.scrollTop = active?.offsetTop - 300
		}
	}, [currentTime, currentTrack])
	return (
		<section className='lyric-wrapper'>
			<div className='lyric-container' ref={lyricRef}>
				{currentLyric?.map((lyric, index) => (
					<p
						key={index}
						className={cn('lyric-item', {
							active: index === currentLyricIndex
						})}
					>
						{lyric.text}
					</p>
				))}
			</div>
		</section>
	)
}
