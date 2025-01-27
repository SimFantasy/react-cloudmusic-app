import { fetchDiscoverNewSong, fetchDiscoverPlaylist } from '@/service/api/discover'
import { useRequest } from 'alova/client'

// 获取发现音乐歌单
export const useDiscoverPlaylist = () => useRequest(fetchDiscoverPlaylist)

// 获取发现新歌
export const useDiscoverNewSong = () => useRequest(fetchDiscoverNewSong)
