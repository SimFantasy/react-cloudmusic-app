/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useTransition } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { FormWrapper } from '@/components/auth/auth-form-wrapper'
import { CountDown } from '@/components/common/count-down'

import {
	phonePasswordSchema,
	phoneSmsSchema,
	type PhonePasswordType,
	type PhoneSmsType
} from '@/lib/schemes'
import { AuthTypeStatus } from '@/types/auth'
// import { cookieStorage } from '@/lib/storage'

import {
	fetchPhoneLogin,
	fetchVerifyCaptcha,
	fetchSendCaptcha,
	fetchUserInfo,
	fetchLoginStatus
} from '@/service/api/auth'

import { useAuthStore } from '@/store/auth'

type LoginPhoneProps = {
	setOpen: (open: boolean) => void
	authType: AuthTypeStatus
	setAuthType: (authType: AuthTypeStatus) => void
}

export const LoginPhone: React.FC<LoginPhoneProps> = ({ setOpen, authType, setAuthType }) => {
	const [showCountDown, setShowCountDown] = useState(false)
	const [codeIsPending, codeStartTransition] = useTransition()
	const [smsIsPending, smsStartTransition] = useTransition()
	const [phoneIsPending, phoneStartTransition] = useTransition()

	const { setUserInfo, setIsLogin } = useAuthStore()

	const phonePasswordform = useForm<PhonePasswordType>({
		resolver: zodResolver(phonePasswordSchema),
		defaultValues: {
			phone: '',
			password: ''
		}
	})

	const phoneSmsform = useForm<PhoneSmsType>({
		resolver: zodResolver(phoneSmsSchema),
		defaultValues: {
			phone: '',
			code: ''
		}
	})

	const handleSendCaptcha = () => {
		const phone = phoneSmsform.getValues().phone
		codeStartTransition(() => {
			if (!phone || showCountDown) return
			fetchSendCaptcha(phone).then((res: any) => {
				if (res.code === 200) {
					setShowCountDown(true)
					toast.success('验证码已发送，请注意查收')
				}
			})
		})
	}

	const onPhonePasswordSubmit = (values: PhonePasswordType) => {
		console.log('values', values)

		phoneStartTransition(() => {
			fetchPhoneLogin(values.phone, values.password).then(res => {
				console.log('phone login success', res)
			})
		})
	}

	const onPhoneSmsSubmit = (values: PhoneSmsType) => {
		// console.log('values', values)
		smsStartTransition(() => {
			fetchVerifyCaptcha(values.phone, values.code)
				.then((res: any) => {
					if (res.code === 200) {
						// cookieStorage.set(res?.cookie)
						toast.success('登录成功')

						fetchLoginStatus().then(res => {
							if (res.data.code === 200) {
								fetchUserInfo(res.data.account.id).then(res => {
									setUserInfo(res)
								})
							}
						})

						setIsLogin(true)
						setOpen(false)

						location.reload()
					} else {
						toast.error(res.msg)
					}
				})
				.catch(error => {
					console.log('Sms login failed:', error)
					toast.error(error.response.data.msg)
				})
		})
	}

	const error =
		authType === AuthTypeStatus.PHONE
			? phonePasswordform.formState.errors
			: phoneSmsform.formState.errors

	return (
		<FormWrapper authType={authType} setAuthType={setAuthType} error={error}>
			{authType === AuthTypeStatus.PHONE && (
				<Form {...phonePasswordform}>
					<form
						onSubmit={phonePasswordform.handleSubmit(onPhonePasswordSubmit)}
						className='px-2 space-y-4'
					>
						<FormField
							control={phonePasswordform.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='请输入手机号'
											className='auth-input'
											autoComplete='off'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={phonePasswordform.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type='password'
											placeholder='请输入密码'
											className='auth-input'
											autoComplete='off'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormItem>
							<FormControl>
								<div className='flex-x-4 justify-between'>
									<div className='flex-x-2'>
										<Checkbox
											checked
											id='save-login'
											className='border-blue-500 focus-visible:!ring-blue-500 data-[state=checked]:!bg-blue-500'
										/>
										<label htmlFor='save-login' className='text-sm text-primary/80'>
											自动登录
										</label>
									</div>

									<span
										className='text-xs text-primary/50 cursor-pointer hover:text-primary/80'
										onClick={() => setAuthType(AuthTypeStatus.SMS)}
									>
										验证码登录
									</span>
								</div>
							</FormControl>
						</FormItem>
						<Button type='submit' size='lg' className='auth-button' disabled={phoneIsPending}>
							登录
						</Button>
					</form>
				</Form>
			)}

			{authType === AuthTypeStatus.SMS && (
				<Form {...phoneSmsform}>
					<form onSubmit={phoneSmsform.handleSubmit(onPhoneSmsSubmit)} className='px-2 space-y-4'>
						<FormField
							control={phoneSmsform.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='请输入手机号'
											className='auth-input'
											autoComplete='off'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={phoneSmsform.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex-x-4 justify-between'>
											<Input
												placeholder='请输入验证码'
												className='auth-input'
												autoComplete='off'
												{...field}
											/>

											<Button
												variant='outline'
												onClick={handleSendCaptcha}
												disabled={codeIsPending}
												className='!rounded-full text-sm text-primary/50'
											>
												{showCountDown ? (
													<CountDown time={60} onEnd={() => setShowCountDown(false)} />
												) : (
													'获取验证码'
												)}
											</Button>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormItem>
							<FormControl>
								<div className='flex-x-4 justify-between'>
									<div className='flex-x-2'>
										<Checkbox
											checked
											id='save-login'
											className='border-blue-500 focus-visible:!ring-blue-500 data-[state=checked]:!bg-blue-500'
										/>
										<label htmlFor='save-login' className='text-sm text-primary/80'>
											自动登录
										</label>
									</div>

									<span
										className='text-xs text-primary/50 cursor-pointer hover:text-primary/80'
										onClick={() => setAuthType(AuthTypeStatus.PHONE)}
									>
										密码登录
									</span>
								</div>
							</FormControl>
						</FormItem>
						<Button type='submit' size='lg' className='auth-button' disabled={smsIsPending}>
							登录
						</Button>
					</form>
				</Form>
			)}
		</FormWrapper>
	)
}
