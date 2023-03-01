import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/General/Footer'
import Header from './components/General/Header'

const GeneralPath = () => {
	const location = useLocation()

	return (
		<>
			<Header type={location?.pathname === '/home' ? 1 : 2} />
			<div>
				<Outlet />
			</div>
			<Footer />
		</>
	)
}

export default GeneralPath
