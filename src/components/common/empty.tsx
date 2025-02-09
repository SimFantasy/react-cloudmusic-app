import React from 'react'
import { PackageOpen } from 'lucide-react'

type EmptyProps = {
	text?: string
}

export const Empty: React.FC<EmptyProps> = ({ text = '暂无数据' }) => {
	return (
		<div className='flex-center p-4 bg-card rounded-lg'>
			<div className='flex-y-2'>
				<PackageOpen className='size-12 stroke-1 stroke-primary/20' />
				<span className='text-sm text-primary/50'>{text}</span>
			</div>
		</div>
	)
}
