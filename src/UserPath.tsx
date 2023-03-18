import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import NavHeader from './components/userDashboard/NavHeader'
import Navigation from './components/userDashboard/Navigation'
import BreadCrumb from './components/BreadCrumb'
import { useAppSelector } from './app/hooks'
import items from './components/userDashboard/Navigation/menu'

const UserPath = () => {
	const navigate = useNavigate()
	const { user_detail } = useAppSelector((state) => state.auth)

	const [allow, setAllow] = useState(false)

	const handle = useFullScreenHandle()

	const toggleHandle = (e) => {
		e.preventDefault()
		handle.enter()
	}

	const [openMenu, setOpenMenu] = useState(false)

	const toggleMenu = (e: any) => {
		e.preventDefault()
		setOpenMenu(!openMenu)
	}

	const outsideClick = (e: any) => {
		setOpenMenu(false)
	}

	const location = useLocation()

	// const head = location.pathname.split('/')
	// const title = head[head.length - 1]

	const checkPermissionHandler = (pathname: string) => {
		// let pathnameArray = pathname.trim().split('/')
		// let newPath = '/' + pathnameArray[1] + '/' + pathnameArray[2]
		let check = items[0].children.find((e) => e.url === location.pathname)

		if (check && user_detail) {
			if (check.permission.includes(user_detail?.role)) {
				setAllow(true)
			} else {
				setAllow(false)
				navigate('/user/dashboard/home') //Navigate to a common page
			}
		} else {
			console.log('Path not found') //Navigate to 404 page
		}
	}

	useEffect(() => {
		if (user_detail === null) {
			navigate('/auth/login')
		}
	}, [user_detail])

	useEffect(() => {
		if (user_detail) {
			checkPermissionHandler(location.pathname)
		}
	}, [user_detail, location.pathname])

	return allow ? (
		<FullScreen handle={handle}>
			<Navigation openMenu={openMenu} toggleMenu={outsideClick} />
			<NavHeader
				openMenu={openMenu}
				toggleMenu={toggleMenu}
				handle={(e) => toggleHandle(e)}
			/>
			<div className='pcoded-main-container'>
				<div className='pcoded-wrapper'>
					<div className='pcoded-content'>
						<div className='pcoded-inner-content'>
							<BreadCrumb loc={location} />
							<div className='main-body'>
								<div className='page-wrapper'>
									<Outlet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</FullScreen>
	) : (
		<Navigate to='/user/dashboard/home' />
	)
}

export default UserPath
