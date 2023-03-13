import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import RouteToTop from './utils/RouteToTop'

const AuthPath = () => {
	const location = useLocation()

	return (
		<>
			<RouteToTop prevLoc={location}>
				<Outlet />
			</RouteToTop>
		</>
	)
}

export default AuthPath
