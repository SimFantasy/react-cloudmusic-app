import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { ListMusic, Trash2 } from 'lucide-react'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useAudioPlayer } from '@/store/audio-player'
import { PlaylistButtonList } from './playlist-button-list'

export const PlaylistButton: React.FC = () => {
	const playlist = useAudioPlayer(state => state.playlist)
	const setPlaylist = useAudioPlayer(state => state.setPlaylist)

	const hansleClearPlaylist = () => {
		setPlaylist([])
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className='player-btn'>
					<ListMusic className='player-icon' />
				</button>
			</SheetTrigger>

			<SheetContent className='sheet-content'>
				<VisuallyHidden asChild>
					<SheetHeader>
						<SheetTitle />
						<SheetDescription />
					</SheetHeader>
				</VisuallyHidden>

				<div className='grid grid-rows-[auto,1fr] gap-4'>
					<section className='flex-x-4 justify-between px-4 h-10'>
						<div className='flex gap-x-1'>
							<h1 className='text-base text-promary/80 font-semibold'>播放列表</h1>
							<span className='text-xs text-primary/50'>{playlist.length}</span>
						</div>

						<div className='flex-end'>
							<button
								className='flex-x-1 text-primary/50 text-sm hover:text-blue-500'
								onClick={hansleClearPlaylist}
							>
								<Trash2 className='size-4' />
								<span>清空</span>
							</button>
						</div>
					</section>

					<ScrollArea className='px-4 w-full h-[calc(100vh-16.5em)]'>
						<PlaylistButtonList playlists={playlist} />
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	)
}
