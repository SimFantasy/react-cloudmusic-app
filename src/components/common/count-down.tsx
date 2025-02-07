import { useState, useEffect } from 'react'

type CountDownProps = {
	onEnd: () => void
	time: number
}

export const CountDown = ({ onEnd, time }: CountDownProps) => {
	const [count, setCount] = useState<number>(time)

	useEffect(() => {
		const timer = setInterval(() => {
			if (count > 1) {
				setCount(count => count - 1)
			} else {
				clearInterval(timer)
				onEnd()
			}
		}, 1000)
		return () => clearInterval(timer)
	}, [count, onEnd])
	return <span className='text-sm text-primary/40'>{count.toString()}s</span>
}
