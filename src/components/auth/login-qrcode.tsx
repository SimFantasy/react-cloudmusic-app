import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
	fetchQrcodeKey,
	fetchCreateQrcode,
	fetchCheckQrcodeStatus,
	fetchLoginStatus,
	fetchUserInfo
} from '@/service/api/auth'
import { cookieStorage } from '@/lib/storage'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'

import { AuthTypeStatus, QRCodeStatus } from '@/types/auth'

type LoginQrcodeProps = {
	setOpen: (open: boolean) => void
	setAuthType: (authType: AuthTypeStatus) => void
}

let timer: number | null = null

export const LoginQrcode: React.FC<LoginQrcodeProps> = ({ setOpen, setAuthType }) => {
	const [qrState, setQrState] = useState<QRCodeStatus>(QRCodeStatus.LOADING)
	const [qrCodeImageUrl, setQrCodeImageUrl] = useState('')

	const { setUserInfo, setIsLogin } = useAuthStore()

	// 监听二维码状态
	const handleCheckQrcodeStatus = useCallback(
		(key: string) => {
			if (timer) {
				clearInterval(timer)
			}

			setQrState(QRCodeStatus.WAITING)

			timer = Number(
				setInterval(() => {
					fetchCheckQrcodeStatus(key).then(res => {
						// 二维码失效或已过期
						if (res.code === 800) {
							clearInterval(timer!)
							setQrState(QRCodeStatus.FAIL)
						}
						// 待确认，授权中
						if (res.code === 802) {
							setQrState(QRCodeStatus.AUTHORIZING)
						}
						// 登录成功
						if (res.code === 803) {
							clearInterval(timer!)
							setQrState(QRCodeStatus.SUCCESS)

							console.log('qrcode login success', res)
							if (res.cookie) {
								cookieStorage.set(res.cookie)
							}

							fetchLoginStatus().then(res => {
								console.log('state login success', res)
								if (res.data.code === 200) {
									fetchUserInfo(res.data.account.id).then(res => {
										setUserInfo(res)
									})
								}
							})

							setIsLogin(true)
							toast.success('登录成功')
							setOpen(false)
							location.reload()
						}
					})
				}, 2000)
			)
		},
		[setOpen, setIsLogin, setUserInfo]
	)

	// 获取二维码图片并开始监听
	const getQrcodeImage = useCallback(async () => {
		try {
			// 获取二维码key
			const qrcodeKey = await fetchQrcodeKey()
			// 如果获取失败，则返回
			if (qrcodeKey.code !== 200) return
			// 获取二维码图片
			const { data } = await fetchCreateQrcode(qrcodeKey.data.unikey)
			// 设置二维码图片
			setQrCodeImageUrl(data.qrimg)
			// 开始监听二维码
			handleCheckQrcodeStatus(qrcodeKey.data.unikey)
		} catch (error) {
			console.log('Get qrcode image error: ', error)
		}
	}, [handleCheckQrcodeStatus])

	useEffect(() => {
		getQrcodeImage()
		return () => {
			clearInterval(timer!)
		}
	}, [getQrcodeImage])

	return (
		<div className='grid grid-rows-[auto,1fr,auto] items-center py-10 size-full'>
			<h1 className='text-center text-lg text-primary/80'>扫码登录</h1>

			<div className='relative flex-center gap-x-4 w-full h-60' onClick={getQrcodeImage}>
				{/* 二维码 */}
				{(qrState === QRCodeStatus.FAIL ||
					qrState === QRCodeStatus.WAITING ||
					qrState === QRCodeStatus.AUTHORIZING) && (
					<div className={cn('flex-y-1 items-center w-80 text-center trans-all origin-top-left')}>
						<img src={qrCodeImageUrl} alt='qrcode' className='size-auto object-cover trans-all' />
						<h2 className='text-sm text-primary/50'>使用 网易云音乐APP 扫码登录</h2>
					</div>
				)}
				{/* 加载中 */}
				<div
					className={cn(
						'absolute z-10 inset-0 flex-center size-0 text-sm text-primary/50 opacity-0 trans-all',
						{
							'opacity-100 size-full': qrState === QRCodeStatus.LOADING
						}
					)}
				>
					二维码加载中...
				</div>
				{/* 二维码失效 */}
				<div
					className={cn(
						'absolute z-20 inset-0 flex-y-1 items-center size-0 bg-blue-950/0 text-sm text-white trans-all opacity-0',
						{
							'opacity-100 size-full': qrState === QRCodeStatus.FAIL
						}
					)}
				>
					<span>二维码已失效</span>
					<button>点击刷新</button>
				</div>
			</div>

			<Button
				variant='ghost'
				className='flex-x-2 mx-auto w-fit text-primary/50 ring-0'
				onClick={() => setAuthType(AuthTypeStatus.PHONE)}
			>
				<span>选择其他登录模式</span>
				<ChevronRight className='size-4' />
			</Button>
		</div>
	)
}
