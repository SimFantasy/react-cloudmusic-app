import { Track } from '@/types/playlist'
import Plyr from 'plyr'

/**
 * 播放模式枚举
 */
export enum PlaySequence {
	LIST_LOOP = 0, // 歌单循环
	SHUFFLE = 1, // 随机播放
	SINGLE_LOOP = 2 // 单曲循环
}

/**
 * 播放器错误状态枚举
 */
export enum PlayerError {
	NETWORK_ERROR = 'NETWORK_ERROR', // 网络错误
	AUDIO_LOAD_FAILED = 'AUDIO_LOAD_FAILED', // 音频加载失败
	PLAY_FAILED = 'PLAY_FAILED', // 播放失败
	NO_AUDIO_SOURCE = 'NO_AUDIO_SOURCE', // 无音频源
	AUDIO_NOT_SUPPORTED = 'AUDIO_NOT_SUPPORTED' // 音频格式不支持
}

/**
 * 歌曲质量枚举
 * standard: 标准
 * higher: 较高
 * exhigh: 极高
 * lossless: 无损
 * hires: Hi-Res
 * jyeffect : 高清环绕声
 * sky: 沉浸环绕声
 * jymaster: 超清母带
 */
export enum SongLevel {
	standard = 'standard', // 标准
	higher = 'higher', // 较高
	exhigh = 'exhigh', // 极高
	lossless = 'lossless', // 无损
	hires = 'hires', // Hi-Res
	jyeffect = 'jyeffect', // 高清环绕声
	sky = 'sky', // 沉浸环绕声
	jymaster = 'jymaster' // 超清母带
}

/**
 * 播放器返回类型
 */
export interface AudioPlayerState {
	currentTime: number // 当前音轨播放时间
	duration: number // 当前音轨总时长
	progress: number // 播放进度：百分比，0到100

	volume: number // 当前音量：范围0到1，默认为1
	playSequence: PlaySequence // 播放模式
	playbackRate: number // 播放速率：范围0.5到4，默认为1
	songLevel: SongLevel // 歌曲质量

	currentTrack: Track | null // 当前曲目
	currentTrackIndex: number // 当前曲目索引
	currentLyric: ParseLyric[] | null // 当前歌词
	currentLyricIndex: number // 当前歌词索引
	playlist: Track[] // 播放列表

	isLoading: boolean // 加载状态
	isPlaying: boolean // 播放状态
	isShowPlayer: boolean // 播放器是否展示
	error: PlayerError | null // 错误信息

	init: (player: Plyr) => void // 初始化播放器
	_plyr: Plyr | null // Plyr 实例

	_loadTrack: (track: Track) => Promise<void> // 加载音轨歌词
	_updateLyricIndex: () => void // 更新歌词

	play: () => Promise<void> // 播放
	pause: () => void // 暂停
	toggle: () => Promise<void>

	changeTrack: (type: ChangeTrackType) => void // 切换歌曲
	addTrack: (track: Track) => void // 添加新曲目
	playTrack: (index: number) => Promise<void> // 播放指定曲目
	removeTrack: (trackId: string) => void // 移除曲目
	setPlaylist: (tracks: Track[]) => Promise<void> // 设置播放列表
	addPlaylist: (tracks: Track[]) => void // 添加播放列表

	setVolume: (value: number) => void // 设置音量
	setPlaySequence: (value: PlaySequence) => void // 设置播放模式
	setPlaybackRate: (value: number) => void // 设置播放速率
	setSongLevel: (value: SongLevel) => void // 设置歌曲质量

	setProgress: (value: number) => void // 设置播放进度
	setCurrentTime: (value: number) => void // 设置当前播放时间
	setDuration: (value: number) => void // 设置当前音轨总时长

	setIsLoading: (value: boolean) => void // 设置加载状态
	setIsPlaying: (value: boolean) => void // 设置播放状态
	setIsShowPlayer: (value: boolean) => void // 设置播放器展示状态
}

// 解析后歌词格式
export type ParseLyric = {
	index: number
	time: number
	text: string
}

// 切换歌曲类型
export type ChangeTrackType = 'next' | 'previous'

// Plyr Source 类型
export type PlyrSources = {
	title: string
	type: 'audio'
	sources: PlyrSource[]
}

export type PlyrSource = {
	type:
		| 'audio/mp3'
		| 'audio/ogg'
		| 'audio/wav'
		| 'audio/flac'
		| 'audio/aac'
		| 'audio/m4a'
		| 'audio/webm'
	src: string
}

// Plyr 选项类型
export interface PlyrOptions {
	controls?: string[]
	volume?: number
	muted?: boolean
	speed?: {
		selected: number
		options: number[]
	}
}
