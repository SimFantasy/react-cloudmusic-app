import useUrlState from '@ahooksjs/use-url-state'

import { ArtistCategories } from '@/components/artist/artist-categories'

import type { ArtistCategory } from '@/types/artist'

const Artist = () => {
	const [urlState, setUrlState] = useUrlState<ArtistCategory>(undefined)
	return (
		<div className='page-wrapper page-content'>
			<div className='page-block'>
				<ArtistCategories urlState={urlState} setUrlState={setUrlState} />
			</div>
		</div>
	)
}

export default Artist
