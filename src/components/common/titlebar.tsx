import React from 'react'

import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

type TitlebarProps = {
	title: string
	link?: string
	onClick?: () => void
}

export const Titlebar: React.FC<TitlebarProps> = ({ title, link, onClick }) => {
	const navigate = useNavigate()

	const handleLink = () => {
		if (link) {
			navigate(link)
		} else if (onClick) {
			onClick()
		}
	}
	return (
		<div
			className='flex-x-1 text-primary trans-colors cursor-pointer hover:text-blue-500'
			onClick={handleLink}
		>
			<h1 className='text-lg font-semibold'>{title}</h1>
			{(link || onClick) && <ChevronRight className='sise-4' />}
		</div>
	)
}
