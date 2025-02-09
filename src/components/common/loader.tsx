import { Music2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type LoaderProps = {
	text?: string
	className?: string
}

export const Loader: React.FC<LoaderProps> = ({ text, className }) => {
	return (
		<div className={cn('flex-x-2', className)}>
			<Music2 className='size-4 text-blue-500 animate-bounce' />
			<span className='text-sm text-blue-800'>{text ? `${text} 加载中...` : '加载中...'}</span>
		</div>
	)
}
