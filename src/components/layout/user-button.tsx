import { UserAvatar } from '@/components/common/user-avatar'

export const UserButton = () => {
	return (
		<div className='flex-x-2'>
			<UserAvatar />
			<span className='text-sm text-primary/40'>Guest</span>
		</div>
	)
}
