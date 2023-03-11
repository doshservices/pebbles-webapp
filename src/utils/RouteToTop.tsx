import React, { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const RouteToTop = ({ children, prevLoc }: { children: any; prevLoc: any }) => {
	const location = useLocation()
	console.log('useloc', location)
	console.log('prevLoc', prevLoc)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	return <>{children}</>
}

export default RouteToTop
