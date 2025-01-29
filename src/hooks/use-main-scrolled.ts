import { useEffect } from 'react'
import { useScroll } from 'ahooks'
import { useGlobalStore } from '@/store/global'

export const useMainScrolled = ({
	ref
}: { ref?: React.MutableRefObject<HTMLDivElement | null> | Document } = {}) => {
	const scrollState = useScroll(ref)

	const { scroll, isScrolled, setScroll, setScrolled } = useGlobalStore()

	useEffect(() => {
		if (scrollState && scrollState.top > 0) {
			setScrolled(true)
			setScroll(scrollState.top)
		} else {
			setScrolled(false)
			setScroll(0)
		}
	}, [scrollState, setScrolled, setScroll])

	return { scroll, isScrolled, ref }
}
