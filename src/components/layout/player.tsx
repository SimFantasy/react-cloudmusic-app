import { Slider } from '@/components/ui/slider'

export const Player = () => {
	return (
		<footer className='fixed z-[1000] right-0 bottom-0 grid grid-rows-[auto,1fr] w-full h-20 bg-card/95 backdrop-blur-sm'>
			<Slider />

			<div className='grid grid-cols-[auto,1fr,auto] gap-4 items-center px-4 h-full'></div>
		</footer>
	)
}
