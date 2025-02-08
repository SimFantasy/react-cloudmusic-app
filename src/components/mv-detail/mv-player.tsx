import { useMvUrl } from '@/service/queries/mv'
import { VideoPlayer } from '@/components/common/video-player'
import { Skeleton } from '@/components/ui/skeleton'

type MvPlayerProps = {
	mvid: number
	br?: number
}

export const MvPlayer = ({ mvid, br }: MvPlayerProps) => {
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
