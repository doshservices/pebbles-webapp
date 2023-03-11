import React, { Suspense } from 'react'
import {
	BrowserRouter,
	Navigate,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Preloader from './components/Preloader'

import GeneralPath from './GeneralPath'
import Index from './pages/General/Index'
import SearchApartments from './pages/General/SearchApartments'
import ApartmentDetails from './pages/General/ApartmentDetails'
import About from './pages/General/About'
import Contact from './pages/General/Contact'

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<Preloader />}>
					<Routes>
						{/* ------------------------------ genral routes  ---------------------------------- */}
						<Route path='/' element={<Navigate replace to='/home' />} />
						<Route path='/' element={<GeneralPath />}>
							<Route path='home' element={<Index />} />
							<Route path='search-apartments' element={<SearchApartments />} />
							<Route path='apartments/:id' element={<ApartmentDetails />} />
							<Route path='about-us' element={<About />} />
							<Route path='contact' element={<Contact />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</>
	)
}

export default App
