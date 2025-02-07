/* eslint-disable @typescript-eslint/no-explicit-any */
import { SITE } from '@/config'

// Storage类型
type StorageType = 'localStorage' | 'sessionStorage'

/**
 * Storage类
 * @param key 存储的key
 * @param storageType 存储类型，默认为localStorage
 * @returns Storage实例
 * @example
 * const storage = new Storage('my-key')
 * storage.set('hello')
 * console.log(storage.get()) // 'hello'
 */
class Storage<T = unknown> {
	private readonly key: string
	private readonly storageType: StorageType

	constructor(key: string, storageType: StorageType = 'localStorage') {
		this.key = key
		this.storageType = storageType
	}

	get(): T | null {
		try {
			const value = window[this.storageType].getItem(this.key)
			if (!value) return null
			return JSON.parse(value) as T
		} catch (error: any) {
			console.log(error)
			return null
		}
	}

	set(value: T): void {
		const setValue = JSON.stringify(value)
		window[this.storageType].setItem(this.key, setValue)
	}

	remove(): void {
		window[this.storageType].removeItem(this.key)
	}
}

export const cookieStorage = new Storage<string>(SITE.STORE.COOKIE_KEY)

export default Storage
