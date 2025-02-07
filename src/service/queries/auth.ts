import { useRequest } from 'ahooks'
import { fetchPhoneLogin, fetchVerifyCaptcha, fetchSendCaptcha } from '@/service/api/auth'

export const usePhoneLogin = (phone: string, password: string) =>
	useRequest(() => fetchPhoneLogin(phone, password))

export const usePhoneSms = (phone: string, captcha: string) =>
	useRequest(() => fetchVerifyCaptcha(phone, captcha))

export const useSendCaptcha = () => useRequest((phone: string) => fetchSendCaptcha(phone))
