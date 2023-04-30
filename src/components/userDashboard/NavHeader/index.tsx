import React from 'react'
import { Link } from 'react-router-dom'
import NavRight from './NavRight'
import logo from '../../../assets/Logo_blue.png'
import NavLeft from './NavLeft'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Avatar1 from '../../../assets/profile-circle-black.png'
import { Dropdown } from 'react-bootstrap'
import { reset } from '../../../features/authentication/authenticationSlice'
import { bookingReset } from '../../../features/booking/bookingSlice'
import { apartmentReset } from '../../../features/apartment/apartmentSlice'
import { notificationReset } from '../../../features/notification/notificationSlice'

const NavHeader = ({ openMenu, toggleMenu, handle }) => {
	const dispatch = useAppDispatch()
	const { user_detail } = useAppSelector((state) => state.auth)

	const logoutHandler = (e) => {
		e.preventDefault()
		dispatch(reset())
		dispatch(bookingReset())
		dispatch(apartmentReset())
		dispatch(notificationReset())
	}
	return (
		<header
			className={`navbar pcoded-header navbar-expand-lg header-default bg-white`}
		>
			<div className='m-header mm_header'>
				<Link to={'/'} className='b-brand'>
					<img src={logo} alt='' style={{ width: '11rem' }} />
				</Link>

				<ul className='navbar-nav'>
					<li>
						<div className='pro-head pro_head'>
							{user_detail && user_detail.profilePicture ? (
								<img
									src={user_detail.profilePicture}
									className='dashboard_avatar'
									alt='User Profile'
								/>
							) : (
								<img
									src={Avatar1}
									className='dashboard_avatar'
									alt='User Profile'
								/>
							)}
							<span className='user_name' style={{ color: '#3f4d67' }}>
								{user_detail && user_detail.firstName}
							</span>
						</div>
					</li>
					<li>
						<Dropdown className='drp-user drp_user'>
							<Dropdown.Toggle variant={'link'} id='dropdown-basic'>
								<i className='icon feather icon-settings' />
							</Dropdown.Toggle>
							<Dropdown.Menu className='profile-notification'>
								<ul className='pro-body'>
									<li>
										<Link to='/' className='dropdown-item'>
											<i className='feather icon-home' /> Home
										</Link>
									</li>
									<li>
										<Link
											to='/user/dashboard/profile'
											className='dropdown-item'
										>
											<i className='feather icon-user' /> Profile
										</Link>
									</li>
									{/* <li>
								<a href='#/' className='dropdown-item'>
									<i className='feather icon-mail' /> My Messages
								</a>
							</li> */}
									<li>
										<Link
											to='#'
											className='dropdown-item'
											onClick={logoutHandler}
										>
											<i className='feather icon-lock' /> Sign Out
										</Link>
									</li>
								</ul>
							</Dropdown.Menu>
						</Dropdown>
					</li>
					<li>
						<Link
							className={`mobile-menu ${openMenu && 'on'}`}
							id='mobile-collapse1'
							to={'/#'}
							onClick={toggleMenu}
						>
							<span />
						</Link>
					</li>
				</ul>
			</div>
			{/* <Link className='mobile-menu' id='mobile-header' to={'/#'}>
				<i className='feather icon-more-horizontal' />
			</Link> */}
			<div className='collapse navbar-collapse d-flex justify-content-between bg-white nav_bottom '>
				<NavLeft handle={handle} />
				<NavRight />
			</div>
		</header>
	)
}

export default NavHeader
