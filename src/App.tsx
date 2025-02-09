import React from 'react'
import { RouterProvider } from 'react-router'

import { Toaster } from '@/components/ui/sonner'

import { router } from '@/router'

const App: React.FC = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster richColors />
		</>
	)
}

export default App
