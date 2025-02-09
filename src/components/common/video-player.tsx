import React, { useRef, useEffect } from 'react'
import Plyr from 'plyr'

import 'plyr/dist/plyr.css'

type VideoPlayerProps = {
	src: string
	options?: Partial<Plyr.Options>
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, options }) => {
	const playerRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (playerRef.current && typeof window !== 'undefined') {
			// 初始化 Plyr 实例
			const instance = new Plyr('#video-player', {
				controls: [
					'play',
					'play-large',
					'current-time',
					'duration',
					'progress',
					'mute',
					'volume',
					'pip',
					'fullscreen'
				],
				ratio: '16:9',
				...options
			})

			// 在组件销毁前清理实例
			return () => instance.destroy()
		}
	}, [src, options])
	return (
		<div className='mx-auto w-full rounded-lg overflow-hidden'>
			<video id='video-player' ref={playerRef} src={src} className='w-full rounded-lg' controls />
		</div>
	)
}
