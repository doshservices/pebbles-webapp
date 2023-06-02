import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { MenuItemInterface } from '../menuState'
import NavGroup from './NavGroup'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'

const NavContent = ({
	navigation,
	permission,
}: {
	navigation: MenuItemInterface[]
	permission: string | null
}) => {
	const { user_detail } = useAppSelector((state) => state.auth)
	return (
		<div className='navbar-content datta-scroll'>
			<PerfectScrollbar>
				<ul className='nav pcoded-inner-navbar'>
					{navigation.map((nav, index) => (
						<NavGroup nav={nav} key={index} permission={permission} />
					))}
				</ul>
				{user_detail && user_detail?.role === 'USER' && (
					<ul className='nav pcoded-inner-navbar'>
						<div
							style={{
								width: '80%',
								margin: '2.5rem 10% 0 10%',
							}}
						>
							<div
								style={{
									border: '1px solid rgba(0,0,0,.1)',
								}}
							></div>

							<p className='nav_upgrade'> Upgrade your account </p>
						</div>
						<li>
							<Link
								to='/user/dashboard/upgrade-account'
								className='btn form-control btn_upg'
							>
								Become a Host
							</Link>
						</li>
					</ul>
				)}
			</PerfectScrollbar>
		</div>
	)
}

export default NavContent
