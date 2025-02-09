import React from 'react'

import { useArtistDesc } from '@/service/queries/artist'
import { TextContent } from '@/components/common/text-content'

type ArtistDetailDescriptionProps = {
	artistId?: string
	artistName?: string
}

export const ArtistDetailDescription: React.FC<ArtistDetailDescriptionProps> = ({
	artistId,
	artistName
}) => {
	const { data } = useArtistDesc({ id: Number(artistId) })
	return (
		<div className='flex-y-4'>
			<div className='flex-y-2'>
				<h2 className='text-lg font-semibold text-primary/80'>{artistName}简介</h2>
				<TextContent content={data?.briefDesc || ''} />
			</div>
			{data?.introduction.map(item => (
				<div key={item.ti} className='flex-y-2'>
					<h2 className='text-lg font-semibold text-primary/80'>{item.ti}</h2>
					<TextContent content={item.txt || ''} />
				</div>
			))}
		</div>
	)
}
