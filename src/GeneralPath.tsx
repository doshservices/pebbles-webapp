import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/General/Footer'
import Header from './components/General/Header'
import RouteToTop from './utils/RouteToTop'

const GeneralPath = () => {
	const location = useLocation()

	return (
		<>
			<Header
				type={
					location?.pathname === '/home' ||
					location?.pathname === '/about-us' ||
					location?.pathname === '/events' ||
					location?.pathname === '/add-ons/ride' ||
					location?.pathname === '/add-ons/food' ||
					location?.pathname === '/add-ons/voucher' ||
					location?.pathname === '/add-ons/laundry' ||
					location?.pathname === '/contact'
						? 1
						: 2
				}
			/>
			<RouteToTop prevLoc={location}>
				<Outlet />
			</RouteToTop>
			<Footer />
		</>
	)
}

export default GeneralPath
