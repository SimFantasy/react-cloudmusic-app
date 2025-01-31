import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

import { ParseLyric } from '@/types/audio-player'
import { TopList } from '@/types/toplist'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// 格式化数量
export const formatCount = (count: number = 0) => {
	let result = ''
	if (count >= Math.pow(10, 8)) {
		result = (count / Math.pow(10, 8)).toFixed(2) + '亿'
	} else if (count >= Math.pow(10, 4)) {
		result = (count / Math.pow(10, 4)).toFixed(2) + '万'
	} else {
		result = count.toString()
	}
	return result
}

// 图片尺寸设置
export function thumbnail(url: string, w: number = 200, h: number = w) {
	if (url) {
		return `${url}?param=${w}y${h}`
	} else {
		return `https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg?param=${w}y${h}`
	}
}

// 格式化日期时间
export const formatDate = (date: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss') =>
	dayjs(date).format(format)

// 时间戳格式化音乐时长
export const formatDuration = (timestamp: number) => dayjs.duration(timestamp).format('mm:ss')

// 秒钟格式化音乐时长
export const formatSecondsDuration = (seconds: number) =>
	dayjs.duration(seconds, 'seconds').format('mm:ss')

/**
 * 格式化时间为 mm:ss
 * @param time 时间（秒）
 * @returns 格式化后的时间字符串
 */
export function formatTime(time: number): string {
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time % 60)
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * 歌曲随机索引
 * @param arr 数组
 * @returns 随机索引
 */
export const randomIndex = (arr: number, currentIndex: number = 0): number => {
	const index = Math.floor(Math.random() * arr)
	if (index === currentIndex) {
		return randomIndex(arr, currentIndex)
	}
	return index
}

// 解析歌词字符串并返回包含时间戳和歌词文本的对象数组
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString: string) {
	const lineStrings = lyricString.split('\n')

	const lyrics: ParseLyric[] = []

	lineStrings.forEach((line, index) => {
		if (line) {
			// 匹配时间戳
			const result = parseExp.exec(line)
			if (!result) return
			// 计算时间戳
			const time1 = Number(result[1]) * 60 * 1000
			const time2 = Number(result[2]) * 1000
			const time3 = result[3].length === 3 ? Number(result[3]) * 1 : Number(result[3]) * 10
			// 组装对象
			const time = time1 + time2 + time3
			const text = line.replace(parseExp, '').trim()
			const lineObj = { index, time, text }
			lyrics.push(lineObj)
		}
	})
	return lyrics
}

// 筛选榜单
export function filterToplist(toplist: TopList[], filterToplistIds: number[]): TopList[] {
	return toplist?.filter(item => filterToplistIds.includes(item.id))
}
// 排除榜单
export function filterOtherToplist(toplist: TopList[], filterToplistIds: number[]): TopList[] {
	return toplist?.filter(item => !filterToplistIds.includes(item.id))
}

// 去除数组中的负数和0后，返回排序后的正整数数组
export function sortNumberArray(arr: number[]): number[] {
	// 过滤掉负数和0
	const positiveNumbers = arr.filter(num => num > 0)

	// 对正整数进行排序
	positiveNumbers.sort((a, b) => a - b)

	return positiveNumbers
}

// 去除数组中的负数和0后，返回排序后的字母数组
export function sortLettersArray(arr: string[]): string[] {
	// 过滤掉负整数和0
	const letters = arr.filter(
		item => !['0', '-0', '00', '-00'].includes(item) && /^[a-zA-Z]+$/.test(item)
	)

	// 对字母进行排序
	letters.sort((a, b) => a.localeCompare(b))

	return letters
}
