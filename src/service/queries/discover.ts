import { useRequest } from 'ahooks'
import { fetchDiscoverPlaylist, fetchDiscoverNewSong } from '@/service/api/discover'

// 获取发现音乐歌单
export const useDiscoverPlaylist = () => useRequest(fetchDiscoverPlaylist)

// 获取发现新歌
export const useDiscoverNewSong = () => useRequest(fetchDiscoverNewSong)
