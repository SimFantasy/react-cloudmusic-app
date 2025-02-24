import React from 'react'

import { SubscribeCard } from '@/components/subscribe/subscribe-card'
import { SubscribeSkeleton } from '@/components/subscribe/subscribe-skeleton'

import { SITE } from '@/config'
import { PlaylistSubscriber } from '@/types/playlist'

type SubscribeListProps = {
	subscribes?: PlaylistSubscriber[]
	loading: boolean
}

export const SubscribeList: React.FC<SubscribeListProps> = ({ subscribes, loading }) => {
	return (
		<div className='grid grid-cols-4 gap-4 xl:grid-cols-6'>
			{loading
				? Array.from({ length: SITE.PLAYLIST.SUBSCRIBE_LIMIT }).map((_, index) => (
						<SubscribeSkeleton key={index} />
				  ))
				: subscribes?.map(subscribe => (
						<SubscribeCard key={subscribe.userId} subscribe={subscribe} />
				  ))}
		</div>
	)
}
