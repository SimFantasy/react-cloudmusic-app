import React from 'react'

import { AlbumCard } from '@/components/album/album-card'
import { AlbumSkeleton } from '@/components/album/album-skeleton'

import { SITE } from '@/config'

import { Album } from '@/types/album'
import { Album as AlbumType } from '@/types/playlist'

type AlbumListProps = {
	albums?: Album[] | AlbumType[]
	loading: boolean
}

export const AlbumList: React.FC<AlbumListProps> = ({ albums, loading }) => {
	return (
		<div className='grid grid-cols-4 gap-4 xl:grid-cols-6'>
			{loading
				? Array.from({ length: SITE.ARTIST.ALBUM_LIMIT }).map((_, index) => (
						<AlbumSkeleton key={index} />
				  ))
				: albums?.map((album, index) => {
						const key =
							(album as Album).id! +
								(album as Album).picId! +
								(album as Album).publishTime +
								index || (album as AlbumType).id + (album as AlbumType).name + index
						return <AlbumCard key={key} album={album} />
				  })}
		</div>
	)
}
