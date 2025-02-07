import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-blue-500/20'>
			<SliderPrimitive.Range className='absolute h-full bg-gradient-to-r from-sky-500 from-80% to-blue-500 to-20%' />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className='block size-3 rounded-full border-[2px] border-blue-500 bg-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50' />
	</SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
