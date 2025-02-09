import React from 'react'

import { VideoPlayer } from '@/components/common/video-player'
import { Skeleton } from '@/components/ui/skeleton'

import { useMvUrl } from '@/service/queries/mv'

type MvPlayerProps = {
	mvid: number
	br?: number
}

export const MvPlayer: React.FC<MvPlayerProps> = ({ mvid, br }) => {
	const { data, loading } = useMvUrl(mvid, br)

	return (
		<>
			{loading ? (
				<Skeleton className='w-full h-80 rounded-lg' />
			) : (
				data && <VideoPlayer src={data.url} />
			)}
		</>
	)
}
