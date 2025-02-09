import React from 'react'
import { useDebounceFn } from 'ahooks'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { useAudioPlayer } from '@/store/audio-player'
import { cn } from '@/lib/utils'
import { Song, Track } from '@/types/playlist'

type PlaylistButtonProps = {
	playlistId?: string
	children: React.ReactNode
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
	type: 'set' | 'add'
	className?: string
	tracks?: Track[] | Song[]
}

export const PlaylistButton: React.FC<PlaylistButtonProps> = ({
	className,

	type,
	children,
	variant,
	tracks
}) => {
	const setPlaylist = useAudioPlayer(state => state.setPlaylist)
	const addPlaylist = useAudioPlayer(state => state.addPlaylist)

	const { run: handleSetPlaylist } = useDebounceFn(
		() => {
			if (tracks && tracks.length) {
				setPlaylist(tracks)
				toast.success('已更新播放列表')
			}
		},
		{
			wait: 500
		}
	)

	const { run: handleAddPlaylist } = useDebounceFn(
		() => {
			if (tracks && tracks.length) {
				addPlaylist(tracks, 'end')
				toast.success('已添加到播放列表')
			}
		},
		{
			wait: 500
		}
	)

	return (
		<Button
			variant={variant}
			className={cn(className)}
			onClick={type === 'add' ? handleAddPlaylist : handleSetPlaylist}
		>
			{children}
		</Button>
	)
}
