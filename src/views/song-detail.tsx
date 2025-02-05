import { SongDetailDisc } from '@/components/player/song-detail-disc'
import { SongDetailLyric } from '@/components/player/song-detail-lyric'
import { thumbnail } from '@/lib/utils'
import { useAudioPlayer } from '@/store/audio-player'

const SongDetail = () => {
	const { currentTrack } = useAudioPlayer()

	const coverImage = thumbnail(currentTrack?.al.picUrl || '', 1000)

	return (
		<div className='page-wrapper page-content flex-center h-full'>
			{/* Track card */}
			<div className='relative mt-4 mb-6 size-full rounded-lg overflow-hidden'>
				{/* Overlay */}
				<div className='absolute z-10 inset-0 flex-x-4 justify-between size-full bg-blue-500/40 backdrop-blur'>
					{/* Disc info */}
					<SongDetailDisc />

					{/* Lyric */}
					<SongDetailLyric />
				</div>

				{/* Bg image */}
				<img
					src={coverImage}
					alt={currentTrack?.name}
					className='absolute z-0 size-full object-cover opacity-60'
				/>
			</div>
		</div>
	)
}

export default SongDetail
