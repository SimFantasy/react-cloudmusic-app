import React, { useEffect, Suspense, type LazyExoticComponent } from 'react'

import { Loader } from '@/components/common/loader'

import { SITE } from '@/config'

type LazyComponentProps = {
	lazyElement: LazyExoticComponent<React.FC>
	title: string
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
	lazyElement: LazyElement,
	title
}) => {
	useEffect(() => {
		if (title !== 'Layout') {
			document.title = `${title} - ${SITE.NAME}`
		}
	}, [title])

	return (
		<Suspense fallback={<Loader className='m-4' />}>
			<LazyElement />
		</Suspense>
	)
}
