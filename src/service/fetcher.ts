/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { SITE } from '@/config'

const createInstance = () => {
	const instance = axios.create({
		baseURL: SITE.SERVER.BASE_URL,
		timeout: SITE.SERVER.TIMEOUT,
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true // 发起请求时带上 cookie
	})

	instance.interceptors.request.use(handleRequest, handleRequestError)
	instance.interceptors.response.use(handleResponse, handleResponseError)

	return instance
}

const handleRequest = (config: InternalAxiosRequestConfig) => config
const handleRequestError = (error: any) => Promise.reject(error)

const handleResponse = (response: AxiosResponse) => {
	if (response && response.data) {
		return response.data
	}
	return response
}
const handleResponseError = (error: any) => {
	if (error.response) {
		console.error(`HTTP Error: ${error.response.status}, Message: ${error.response.data?.message}`)

		if (error.response.data && error.response.data.data) {
			console.error(error.response.data.data)
		} else {
			console.error('服务器错误,请稍后再试!')
		}
	} else if (error.request) {
		console.error('No response received:', error.request)
		console.error('服务器未响应,请稍后再试!')
	} else {
		console.error('Error:', error.message)
		console.error('请求错误,请稍后再试!')
	}
	return Promise.reject(error)
}

export const fetcher = createInstance()
