import React from 'react'
import { Link } from 'react-router'

import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/common/logo'

import { ROUTES } from '@/config'

const NotFound: React.FC = () => {
	return (
		<div className='flex-center w-full h-screen bg-gradient-to-tr from-blue-500/10 to-sky-500/5'>
			<div className='flex flex-col justify-center items-center gap-8 mt-4 mb-6 page-wrapper h-2/3 bg-card/90 rounded-lg trans-shadow shadow-none hover:shadow-xl'>
				<Logo size='lg' />
				<h1 className='text-7xl font-semibold text-blue-950/80'>404 没有找到页面</h1>
				<p className='text-base text-primary/50'>你访问的页面不存在，请检查地址是否正确。</p>

				<Link
					to={ROUTES.HOME}
					className={buttonVariants({
						variant: 'default',
						size: 'lg',
						className: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white'
					})}
				>
					返回首页
				</Link>
			</div>
		</div>
	)
}

export default NotFound
