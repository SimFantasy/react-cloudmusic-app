import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { usePlaylistSongs } from '@/service/queries/playlist'
import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'

type PlaylistButtonProps = {
	playlistId?: string
	children: React.ReactNode
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
	type: 'set' | 'add'
	className?: string
}

export const PlaylistButton = ({
	className,
	playlistId,
	type,
	children,
	variant
}: PlaylistButtonProps) => {
	const setPlaylist = useAudioPlayer(state => state.setPlaylist)
	const addPlaylist = useAudioPlayer(state => state.addPlaylist)

	const { data: playlistSongs, loading: loadingSongs } = usePlaylistSongs({
		playlistId: playlistId as string
	})

	const handleSetPlaylist = () => {
		if (!playlistSongs || !playlistSongs.length) return

		setPlaylist(playlistSongs)
		toast.success('已更新播放列表')
	}

	const handleAddPlaylist = () => {
		if (!playlistSongs || !playlistSongs.length) return
		addPlaylist(playlistSongs, 'end')
		toast.success('已添加到播放列表')
	}

	return (
		<Button
			variant={variant}
			className={cn(className)}
			onClick={type === 'add' ? handleAddPlaylist : handleSetPlaylist}
			disabled={loadingSongs}
		>
			{children}
		</Button>
	)
}
