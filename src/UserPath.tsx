import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import NavHeader from './components/userDashboard/NavHeader'
import Navigation from './components/userDashboard/Navigation'
import BreadCrumb from './components/BreadCrumb'

const UserPath = () => {
	// const userAuth = useSelector((state) => state.userAuth)
	// const { userDetail } = userAuth
	const userDetail = true

	const handle = useFullScreenHandle()

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

	return userDetail ? (
		<FullScreen handle={handle}>
			<Navigation openMenu={openMenu} toggleMenu={outsideClick} />
			<NavHeader
				openMenu={openMenu}
				toggleMenu={toggleMenu}
				handle={() => handle.enter}
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
		<Navigate to='/' />
	)
}

export default UserPath
