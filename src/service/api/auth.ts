/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/service/fetcher'
import { UserAccount, UserDetail, UserStateus } from '@/types/auth'
import { md5 } from 'js-md5'

/**
 * 二维码登录
 */

//获取二维码Key
type FetchQrcodeKeyResponse = { code: number; data: { code: number; unikey: string } }
export const fetchQrcodeKey = async (): Promise<FetchQrcodeKeyResponse> => {
	const response = await fetcher<any, FetchQrcodeKeyResponse>({
		method: 'GET',
		url: '/login/qr/key',
		params: {
			timerstamp: +Date.now()
		}
	})
	return response
}

//生成二维码接口
type FetchCreateQrcodeResponse = { code: number; data: { qrurl: string; qrimg: string } }
export const fetchCreateQrcode = async (key: string): Promise<FetchCreateQrcodeResponse> => {
	const response = await fetcher<any, FetchCreateQrcodeResponse>({
		method: 'GET',
		url: '/login/qr/create',
		params: {
			key,
			timerstamp: +Date.now(),
			qrimg: true
		}
	})
	return response
}

//检测二维码状态
type FetchCheckQrcodeStatusResponse = { code: number; message: string; cookie: string }
export const fetchCheckQrcodeStatus = async (
	key: string
): Promise<FetchCheckQrcodeStatusResponse> => {
	const response = await fetcher<any, FetchCheckQrcodeStatusResponse>({
		method: 'GET',
		url: '/login/qr/check',
		params: {
			key,
			timerstamp: +Date.now()
		}
	})
	return response
}

/**
 * 手机登录短信
 */
// 发送验证码
export const fetchSendCaptcha = async (phone: string) => {
	const response = await fetcher({
		method: 'GET',
		url: '/captcha/sent',
		params: {
			phone
		}
	})
	return response
}

// 验证验证码
type FetchVerifyCaptchaResponse = { code: number; data: boolean }
export const fetchVerifyCaptcha = async (phone: string, captcha: string) => {
	const response = await fetcher<any, FetchVerifyCaptchaResponse>({
		method: 'GET',
		url: '/captcha/verify',
		params: {
			phone,
			captcha
		}
	})
	return response
}

/**
 * 手机密码登录
 */
export const fetchPhoneLogin = async (phone: string, password: string) => {
	const md5_password = md5(password)
	const response = await fetcher({
		method: 'GET',
		url: '/login/cellphone',
		params: {
			phone,
			password: md5_password
		}
	})
	return response
}

/**
 *  邮箱登录
 */
export const fetchEmailLogin = async (email: string, password: string) => {
	const md5_password = md5(password)
	const response = await fetcher({
		method: 'GET',
		url: '/login',
		params: {
			email,
			md5_password
		}
	})
	return response
}

/**
 *  退出登录
 */
export const fetchLogout = async () => {
	const response = await fetcher({
		method: 'GET',
		url: '/logout'
	})
	return response
}

/**
 *  状态 & 信息
 */

// 检查登录状态
export const fetchLoginStatus = async () => {
	const response = await fetcher<any, UserStateus>({
		method: 'GET',
		url: '/login/status'
	})
	return response
}

// 获取用户详情
export const fetchUserInfo = async (uid: number) => {
	const response = await fetcher<any, UserDetail>({
		method: 'GET',
		url: '/user/detail',
		params: { uid }
	})
	return response
}

// 获取账号信息
export const fetchUserAccount = async () => {
	const response = await fetcher<any, UserAccount>({
		method: 'GET',
		url: '/user/account'
	})
	return response
}
