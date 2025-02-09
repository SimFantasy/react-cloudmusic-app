import type { FieldErrors } from 'react-hook-form'
import { ChevronLeft, Instagram, Mail, Twitch, Twitter } from 'lucide-react'

import { Logo } from '@/components/common/logo'
import { Button } from '@/components/ui/button'

import { AuthTypeStatus } from '@/types/auth'

import qrcodeLinkImage from '@/assets/images/qrcode-link.png'

import { isEmptyObject } from '@/lib/utils'

type FormWrapperProps = {
	authType: AuthTypeStatus
	setAuthType: (authType: AuthTypeStatus) => void
	error?: FieldErrors<FormData> | null
	children: React.ReactNode
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
	authType,
	setAuthType,
	error,
	children
}) => {
	return (
		<div className='grid grid-rows-[auto,1fr] items-center py-10 size-full'>
			{/* Qrcode link */}
			{(authType === AuthTypeStatus.PHONE || authType === AuthTypeStatus.SMS) && (
				<div className='absolute z-10 top-0 left-0 size-16 rounded-l-lg overflow-hidden'>
					<img
						onClick={() => setAuthType(AuthTypeStatus.QRCODE)}
						src={qrcodeLinkImage}
						alt='qrcode-link'
						className='size-full object-cover -rotate-180 cursor-pointer'
					/>
				</div>
			)}

			{/* Email link */}
			{authType === AuthTypeStatus.EMAIL && (
				<Button
					onClick={() => setAuthType(AuthTypeStatus.PHONE)}
					variant='ghost'
					size='sm'
					className='absolute z-10 top-2 left-2 flex-x-2 w-fit text-sm text-primary/50'
				>
					<ChevronLeft className='size-4' />
					<span>返回手机登录</span>
				</Button>
			)}

			{/* Logo */}
			<div className='flex-center w-full'>
				<Logo size='xl' />
			</div>

			{children}

			{error && !isEmptyObject(error) && (
				<div className='error-alert'>
					{Object.entries(error).map(([key, value]) => (
						<div key={key}>{value.message}</div>
					))}
				</div>
			)}

			<div className='flex-center gap-x-6 mt-6 w-full'>
				<Button variant='outline' size='lg' className='auth-social-button'>
					<Instagram />
				</Button>

				<Button variant='outline' size='lg' className='auth-social-button'>
					<Twitter />
				</Button>

				<Button variant='outline' size='lg' className='auth-social-button'>
					<Twitch />
				</Button>

				<Button
					variant='outline'
					size='lg'
					onClick={() => setAuthType(AuthTypeStatus.EMAIL)}
					className='auth-social-button'
				>
					<Mail />
				</Button>
			</div>
		</div>
	)
}
