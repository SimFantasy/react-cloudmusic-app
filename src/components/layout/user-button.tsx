import { useState } from 'react'
import { toast } from 'sonner'

import { UserAvatar } from '@/components/common/user-avatar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { LoginQrcode } from '@/components/auth/login-qrcode'
import { LoginPhone } from '@/components/auth/login-phone'
import { LoginEmail } from '@/components/auth/login-email'

import { AuthTypeStatus } from '@/types/auth'
import { fetchLogout } from '@/service/api/auth'

import { useAuthStore } from '@/store/auth'
import { cookieStorage } from '@/lib/storage'
import { LogOut } from 'lucide-react'

export const UserButton = () => {
	const [authType, setAuthType] = useState<AuthTypeStatus>(AuthTypeStatus.QRCODE)
	const [open, setOpen] = useState(false)
	const { userInfo, isLogin, setUserInfo, setIsLogin } = useAuthStore()

	const userInfoMenu = [
		{ label: '动态', value: userInfo?.profile.eventCount },
		{ label: '关注', value: userInfo?.profile.follows },
		{ label: '粉丝', value: userInfo?.profile.followeds }
	]

	const handleLogout = () => {
		fetchLogout().then((res: any) => {
			if (res.code === 200) {
				setUserInfo(null)
				setIsLogin(false)
				cookieStorage.remove()
				toast.success('登出成功')
			}
		})
	}

	return (
		<>
			{isLogin ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='flex-x-2 cursor-pointer'>
							<UserAvatar image={userInfo?.profile.avatarUrl} name={userInfo?.profile.nickname} />
							<span className='text-sm text-primary/40'>{userInfo?.profile.nickname}</span>
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent className='w-60'>
						<DropdownMenuLabel className='p-2 grid grid-cols-3 gap-2'>
							{userInfoMenu.map(item => (
								<div className='flex-y-2 items-center'>
									<h2 className='text-2xl font-semibold text-primary/80'>{item.value}</h2>
									<span className='text-xs text-primary/50'>{item.label}</span>
								</div>
							))}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className='flex-x-2 text-sm text-primary/50 cursor-pointer hover:text-primary/80'
						>
							<LogOut className='size-4' />
							<span>退出登录</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<div className='flex-x-2'>
							<UserAvatar />
							<span className='text-sm text-primary/40'>Guest</span>
						</div>
					</DialogTrigger>

					<DialogContent className='p-0 w-[360px] h-[520px]' overlayClassName='bg-transparent'>
						<VisuallyHidden>
							<DialogHeader>
								<DialogTitle />
								<DialogDescription />
							</DialogHeader>
						</VisuallyHidden>
						<div className='relative p-6 size-full'>
							{authType === AuthTypeStatus.QRCODE && (
								<LoginQrcode setOpen={setOpen} setAuthType={setAuthType} />
							)}

							{(authType === AuthTypeStatus.PHONE || authType === AuthTypeStatus.SMS) && (
								<LoginPhone setOpen={setOpen} authType={authType} setAuthType={setAuthType} />
							)}

							{authType === AuthTypeStatus.EMAIL && (
								<LoginEmail setOpen={setOpen} authType={authType} setAuthType={setAuthType} />
							)}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
