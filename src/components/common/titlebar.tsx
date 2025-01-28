'use client'

import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

type TitlebarProps = {
	title: string
	link?: string
}

export const Titlebar = ({ title, link }: TitlebarProps) => {
	const navigate = useNavigate()

	const handleLink = () => {
		if (link) {
			navigate(link)
		}
	}
	return (
		<div
			className='flex-x-1 text-primary trans-colors cursor-pointer hover:text-blue-500'
			onClick={handleLink}
		>
			<h1 className='text-lg font-semibold'>{title}</h1>
			{link && <ChevronRight className='sise-5' />}
		</div>
	)
}
