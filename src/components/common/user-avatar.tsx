import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type UserAvatarProps = {
	image?: string
	name?: string
	size?: 'sm' | 'md' | 'lg'
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
	image = '/images/default-avatar.png',
	name = 'Guest',
	size = 'sm'
} = {}) => {
	return (
		<Avatar
			className={cn({
				'size-6': size === 'sm',
				'size-8': size === 'md',
				'size-10': size === 'lg'
			})}
		>
			<AvatarImage src={image} alt={name} />
			<AvatarFallback>{name?.charAt(0).toLocaleUpperCase()}</AvatarFallback>
		</Avatar>
	)
}
