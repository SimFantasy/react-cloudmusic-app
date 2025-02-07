import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Marquee from 'react-fast-marquee'
import { ChevronsUpDown } from 'lucide-react'

import { useAudioPlayer } from '@/store/audio-player'
import { formatTime } from '@/lib/utils'

export const PlayerTrackInfo = () => {
	const navigate = useNavigate()

	const marqueeContainerRef = useRef<HTMLDivElement>(null)
	const marqueeTextRef = useRef<HTMLDivElement>(null)
	const [isPlay, setIsPlay] = useState(false)

	const { currentTrack, currentTime, duration } = useAudioPlayer()

	// 判断歌曲标题和专辑文字是否需要滚动
	useEffect(() => {
		const containerWidth = marqueeContainerRef.current?.offsetWidth
		const textWidth = marqueeTextRef.current?.offsetWidth
		if (containerWidth && textWidth && containerWidth < textWidth) {
			setIsPlay(true)
		} else {
			setIsPlay(false)
		}
	}, [marqueeContainerRef.current?.offsetWidth, marqueeTextRef.current?.offsetWidth])

	const handleClickTrackDetail = () => {
		if (currentTrack) {
			navigate('/song-detail')
		}
	}
	return (
		<section className='flex-x-4 w-96'>
			<div className='group/cover relative size-12 rounded-md overflow-hidden cursor-pointer'>
				<div
					onClick={handleClickTrackDetail}
					className='absolute z-10 inset-0 flex-center size-full bg-transparent opacity-0 text-white trans-all group-hover/cover:opacity-100 group-hover/cover:bg-blue-950/60'
				>
					<ChevronsUpDown className='size-5' />
				</div>
				<img src={currentTrack?.al.picUrl} className='size-full object-cover' />
			</div>

			<div className='flex-y-1 flex-1 w-20'>
				<Marquee speed={30} play={isPlay} ref={marqueeContainerRef}>
					<div className='flex-x-4' ref={marqueeTextRef}>
						<span className='text-sm text-primary/80'>{currentTrack?.name}</span>
						<span className='text-xs text-primary/50'>{currentTrack?.al.name}</span>
					</div>
				</Marquee>
				<div className='flex-x-4 text-xs text-primary/50'>
					<span className='flex-x-2 max-w-56 line-clamp-1 truncate'>
						{currentTrack?.ar.map(a => a.name).join(' / ')}
					</span>
					<span>
						{formatTime(currentTime)} / {formatTime(duration)}
					</span>
				</div>
			</div>
		</section>
	)
}
