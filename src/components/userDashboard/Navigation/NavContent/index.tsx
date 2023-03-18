import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { MenuItemInterface } from '../menuState'
import NavGroup from './NavGroup'

const NavContent = ({
	navigation,
	permission,
}: {
	navigation: MenuItemInterface[]
	permission: string | null
}) => {
	return (
		<div className='navbar-content datta-scroll'>
			<PerfectScrollbar>
				<ul className='nav pcoded-inner-navbar'>
					{navigation.map((nav, index) => (
						<NavGroup nav={nav} key={index} permission={permission} />
					))}
				</ul>
			</PerfectScrollbar>
		</div>
	)
}

export default NavContent
