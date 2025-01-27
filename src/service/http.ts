import { createAlova } from 'alova'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import ReactHook from 'alova/react'
import { SITE } from '@/config'

export const http = createAlova({
	baseURL: SITE.SERVER.BASE_URL,
	timeout: SITE.SERVER.TIMEOUT,
	statesHook: ReactHook,
	requestAdapter: axiosRequestAdapter(),
	responded: response => response.data
})
