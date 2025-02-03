import { MvCard } from '@/components/mv/mv-card'
import { MvSkeleton } from '@/components/mv/mv-skeleton'
import { SITE } from '@/config'
import { Mv } from '@/types/artist'

type MvListProps = {
	mvs?: Mv[]
	loading: boolean
}

export const MvList = ({ mvs, loading }: MvListProps) => {
	return (
		<div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
			{loading
				? Array.from({ length: SITE.ARTIST.MV_LIMIT }).map((_, i) => <MvSkeleton key={i} />)
				: mvs?.map(mv => <MvCard key={mv.id} mv={mv} />)}
		</div>
	)
}
