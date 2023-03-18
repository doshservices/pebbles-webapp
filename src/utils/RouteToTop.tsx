import React, { useLayoutEffect } from 'react'

const RouteToTop = ({ children, prevLoc }: { children: any; prevLoc: any }) => {
	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	return <>{children}</>
}

export default RouteToTop
