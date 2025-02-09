import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import Plyr from 'plyr'

import { fetchLyric, fetchSongsUrl } from '@/service/api/playlist'
import { SITE } from '@/config'
import { parseLyric, randomIndex } from '@/lib/utils'

import { Track } from '@/types/playlist'
import {
	ChangeTrackType,
	PlyrSources,
	PlaySequence,
	AudioPlayerState,
	PlayerError,
	SongLevel,
	ParseLyric,
	PlaybackRate
} from '@/types/audio-player'

export const useAudioPlayer = createWithEqualityFn<AudioPlayerState>()(
	immer(
		persist(
			(set, get) => ({
				// 播放器状态
				currentTime: 0,
				duration: 0,
				progress: 0,

				volume: 1,
				playSequence: PlaySequence.LIST_LOOP as PlaySequence,
				playbackRate: 1 as PlaybackRate,
				songLevel: SongLevel.EXHIGH as SongLevel,

				currentTrack: null as Track | null,
				currentTrackIndex: -1,
				currentLyric: null as ParseLyric[] | null,
				currentLyricIndex: -1,
				playlist: [] as Track[],

				isLoading: false as boolean,
				isPlaying: false as boolean,
				isShowPlayer: true as boolean,

				error: null as PlayerError | null,
				_plyr: null as Plyr | null,

				// 初始化播放器
				init: (player: Plyr) => {
					// 监听Plyr事件
					player.on('timeupdate', () => {
						const currentTime = player.currentTime
						const duration = player.duration
						const progress = (currentTime / duration) * 100 || 0
						set({ currentTime, duration, progress })

						get()._updateLyricIndex()
					})

					player.on('playing', () => set({ isPlaying: true }))
					player.on('pause', () => set({ isPlaying: false }))
					player.on('ended', () => get().changeTrack('next'))
					player.on('error', event => {
						console.error('播放器错误:', event)
						set({ error: PlayerError.PLAY_FAILED })
						get().changeTrack('next')
					})

					set({ _plyr: player })
				},

				// 加载歌曲
				_loadTrack: async (track: Track) => {
					set({ isLoading: true })

					try {
						// 获取歌曲URL
						const [urls] = await fetchSongsUrl({ ids: [track.id.toString()] })
						if (!urls?.url) {
							throw new Error('获取歌曲URL失败')
						}

						// 获取歌词
						const lyric = await fetchLyric({ id: track.id.toString() })
						const parsedLyric = parseLyric(lyric)

						// 设置Plyr音频源
						const source: PlyrSources = {
							type: 'audio',
							title: track.name,
							sources: [
								{
									src: urls.url,
									type: 'audio/mp3'
								}
							]
						}

						get()._plyr!.source = source

						set({
							currentLyric: parsedLyric,
							currentLyricIndex: -1,
							isLoading: false,
							error: null
						})
					} catch (error) {
						console.error('加载歌曲失败:', error)
						set({ error: PlayerError.AUDIO_LOAD_FAILED, isLoading: false })
					}
				},

				// 更新歌词
				_updateLyricIndex: () => {
					const { currentLyric, currentTime } = get()
					if (!currentLyric) return

					const lyricIndex = currentLyric.findIndex(l => l.time >= currentTime * 1000) - 1
					if (lyricIndex < 0 || get().currentLyricIndex === lyricIndex) return
					set({ currentLyricIndex: lyricIndex })
				},

				// 播放/暂停
				play: async () => {
					const { _plyr, currentTrack } = get()
					if (!_plyr || !currentTrack) return

					// 如果没有音频源，获取歌曲URL
					if (!_plyr.source) {
						await get()._loadTrack(currentTrack)
					}

					await _plyr.play()
				},

				pause: () => {
					const { _plyr } = get()
					_plyr?.pause()
				},

				toggle: async () => {
					const { isPlaying } = get()
					// isPlaying ? get().pause() : await get().play()
					if (isPlaying) {
						get().pause()
					} else {
						await get().play()
					}
				},

				// 切换歌曲
				changeTrack: async (type: ChangeTrackType) => {
					const { playlist, currentTrackIndex, playSequence } = get()
					if (!playlist.length) return

					let nextIndex = currentTrackIndex
					// 当播放模式为随机时
					if (playSequence === PlaySequence.SHUFFLE) {
						nextIndex = randomIndex(playlist.length, currentTrackIndex)
					} else if (playSequence === PlaySequence.LIST_LOOP) {
						// 当播放模式为列表循环时
						if (type === 'next') {
							nextIndex = currentTrackIndex + 1
							if (nextIndex >= playlist.length) {
								nextIndex = 0
							}
						} else {
							nextIndex = currentTrackIndex - 1
							if (nextIndex < 0) {
								nextIndex = playlist.length - 1
							}
						}
					} else {
						// 当播放模式为单曲循环时
						nextIndex = currentTrackIndex
					}

					set({ currentTrackIndex: nextIndex, currentTrack: playlist[nextIndex] })

					await get().playTrack(nextIndex)
				},

				// 播放指定曲目
				playTrack: async (index: number) => {
					const { playlist, _plyr } = get()
					if (index < 0 || index >= playlist.length) return

					const track = playlist[index]
					set({ currentTrack: track, currentTrackIndex: index })
					await get()._loadTrack(track)
					await _plyr?.play()
				},

				// 添加并播放曲目
				addTrack: (track: Track) => {
					const { playlist } = get()
					const existingIndex = playlist.findIndex(t => t.id === track.id)

					if (existingIndex >= 0) {
						get().playTrack(existingIndex)
					} else {
						const newPlaylist = [...playlist, track]
						set({ playlist: newPlaylist })
						get().playTrack(newPlaylist.length - 1)
					}
				},

				/**
				 * 添加曲目到播放列表
				 * 1. 如果播放列表为空，则直接插入播放列表
				 * 2. 如果播放列表不为空，则判断播放列表中是否有该歌曲
				 * 3. 有则该歌曲，则根据pos参数是否为next，是则移动该歌曲到当前索引之后，否则插入到末尾
				 * 4. 如果没有，则根据pos参数是否为next，是则插入到当前索引之后，否则插入到末尾
				 */
				addTrackToPlaylist: (track: Track, pos: 'next' | 'end' = 'next') => {
					const { playlist, currentTrackIndex } = get()

					if (playlist.length === 0) {
						set({ playlist: [track], currentTrack: track, currentTrackIndex: 0 })
						return
					}
					// 判断是否有该歌曲
					const existingIndex = playlist.findIndex(t => t.id === track.id)
					// 有则根据pos参数是否为next，是则移动该歌曲到当前索引之后，否则插入到末尾
					if (existingIndex >= 0) {
						if (pos === 'next') {
							const newPlaylist = [...playlist]
							newPlaylist.splice(currentTrackIndex + 1, 0, newPlaylist.splice(existingIndex, 1)[0])
							set({ playlist: newPlaylist })
						} else {
							const newPlaylist = [...playlist]
							newPlaylist.splice(playlist.length, 0, newPlaylist.splice(existingIndex, 1)[0])
							set({ playlist: newPlaylist })
						}
					} else {
						// 没有则根据pos参数是否为next，是则插入到当前索引之后，否则插入到末尾
						if (pos === 'next') {
							const newPlaylist = [...playlist]
							newPlaylist.splice(currentTrackIndex + 1, 0, track)
							set({ playlist: newPlaylist })
						} else {
							const newPlaylist = [...playlist, track]
							set({ playlist: newPlaylist })
						}
					}
				},

				// 移除曲目
				removeTrack: (trackId: string) => {
					const { playlist, currentTrack } = get()
					const newPlaylist = playlist.filter(t => t.id.toString() !== trackId)
					set({ playlist: newPlaylist })

					if (currentTrack?.id.toString() === trackId) {
						get().changeTrack('next')
					}
				},

				/**
				 * 设置播放列表
				 * 1.检查播放列表是否有该歌曲，有则根据索引播放
				 * 2.没有则添加到列表末尾
				 * 3.根据播放模式切换歌曲
				 */
				setPlaylist: async (tracks: Track[]) => {
					const { _plyr } = get()

					if (_plyr) {
						// 暂停播放
						await _plyr.pause()
						// 清除当前源
						_plyr.source = { type: 'audio', sources: [{ src: '', type: 'audio/mp3' }] }
						// 等待500ms确保播放器完全重置
						await new Promise(resolve => setTimeout(resolve, 500))
					}

					// 设置新播放列表
					set({
						playlist: tracks,
						currentTrack: null,
						currentTrackIndex: -1,
						currentLyric: null,
						currentLyricIndex: -1
					})

					// 如果新播放列表不为空，开始播放第一首
					if (tracks.length > 0) {
						// 等待100ms确保状态更新完成
						await new Promise(resolve => setTimeout(resolve, 100))
						await get().playTrack(0)
					}
				},

				/**
				 * 添加到播放列表
				 * 1. 如果播放列表为空，则直接插入播放列表
				 * 2. 根据当前播放歌曲索引，插入到当前索引之后
				 */
				addPlaylist: (tracks: Track[], pos: 'next' | 'end' = 'next') => {
					const { currentTrackIndex, playlist } = get()

					if (playlist.length === 0) {
						set({ playlist: tracks, currentTrack: tracks[0], currentTrackIndex: 0 })
						return
					}

					if (pos === 'next') {
						const newPlaylist = [...playlist]
						newPlaylist
							.splice(0, currentTrackIndex)
							.concat(tracks, newPlaylist.slice(currentTrackIndex))

						set({ playlist: newPlaylist })
					} else {
						set({ playlist: [...playlist, ...tracks] })
					}
				},

				// 设置音量
				setVolume: (value: number) => {
					const { _plyr } = get()
					if (_plyr) {
						_plyr.volume = value
						set({ volume: value })
					}
				},

				// 设置播放模式
				setPlaySequence: (value: PlaySequence) => {
					set({ playSequence: value })
				},

				// 设置播放进度
				setProgress: (value: number) => {
					const { _plyr, duration } = get()
					if (_plyr) {
						_plyr.currentTime = (value / 100) * duration
					}
				},

				// 设置播放速率
				setPlaybackRate: (value: PlaybackRate) => {
					const { _plyr } = get()
					if (_plyr) {
						_plyr.speed = value
						set({ playbackRate: value })
					}
				},

				// 设置歌曲等级
				setSongLevel: (value: SongLevel) => {
					set({ songLevel: value })
				},

				// 设置当前播放时间
				setCurrentTime: (value: number) => {
					const { _plyr } = get()
					if (_plyr) {
						_plyr.currentTime = value
					}
				},

				// 设置总时长
				setDuration: (value: number) => {
					set({ duration: value })
				},

				// 设置加载状态
				setIsLoading: (value: boolean) => {
					set({ isLoading: value })
				},

				// 设置播放状态
				setIsPlaying: (value: boolean) => {
					set({ isPlaying: value })
				},

				// 设置播放器显示状态
				setIsShowPlayer: (value: boolean) => {
					set({ isShowPlayer: value })
				}
			}),
			{
				name: SITE.STORE.AUDIO_PLAYER,
				partialize: state =>
					Object.fromEntries(
						Object.entries(state).filter(
							([key]) => !['_plyr', 'isLoading', 'isPlaying', 'error'].includes(key)
						)
					)
			}
		)
	),
	shallow
)
