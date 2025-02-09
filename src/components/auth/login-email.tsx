import { AuthTypeStatus } from '@/types/auth'

import { useTransition } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { FormWrapper } from '@/components/auth/auth-form-wrapper'

import { emailSchema, type EmailType } from '@/lib/schemes'

import { fetchEmailLogin, fetchLoginStatus, fetchUserInfo } from '@/service/api/auth'

import { useAuthStore } from '@/store/auth'

type LoginEmailProps = {
	setOpen: (open: boolean) => void
	authType: AuthTypeStatus
	setAuthType: (authType: AuthTypeStatus) => void
}

export const LoginEmail: React.FC<LoginEmailProps> = ({ setOpen, authType, setAuthType }) => {
	const [isPending, startTransition] = useTransition()

	const { setUserInfo, setIsLogin } = useAuthStore()

	const form = useForm<EmailType>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (values: EmailType) => {
		console.log('values', values)
		startTransition(() => {
			fetchEmailLogin(values.email, values.password).then(res => {
				if (res.data.code === 200) {
					console.log('sms login success', res)

					// cookieStorage.set(res?.cookie)
					toast.success('登录成功')

					fetchLoginStatus().then(res => {
						console.log('state login success', res)
						if (res.data.code === 200) {
							fetchUserInfo(res.data.account.id).then(res => {
								console.log('userinfo', res)
								setUserInfo(res)
							})
						}
					})

					setIsLogin(true)
					setOpen(false)

					location.reload()
				} else {
					toast.error(res.data.msg)
				}
			})
		})
	}

	return (
		<FormWrapper authType={authType} setAuthType={setAuthType} error={form.formState.errors}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='px-2 space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='请输入邮箱'
										className='auth-input'
										autoComplete='off'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
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

					<Button type='submit' size='lg' className='auth-button' disabled={isPending}>
						登录
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
