import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAppSelector } from '../../../app/hooks'
import Avatar1 from '../../../assets/profile-circle-black.png'
import { reset } from '../../../features/authentication/authenticationSlice'
import { useAppDispatch } from '../../../app/hooks'
import { bookingReset } from '../../../features/booking/bookingSlice'
import { apartmentReset } from '../../../features/apartment/apartmentSlice'
import { notificationReset } from '../../../features/notification/notificationSlice'
import { FaChevronDown } from 'react-icons/fa'

const NavRight = () => {
	const dispatch = useAppDispatch()
	const { user_detail } = useAppSelector((state) => state.auth)

	const logoutHandler = (e: any) => {
		e.preventDefault()
		dispatch(reset())
		dispatch(bookingReset())
		dispatch(apartmentReset())
		dispatch(notificationReset())
	}

	return (
		<ul
			className='navbar-nav ml-auto'
			style={{ display: 'flex', alignItems: 'center' }}
		>
			<li style={{ lineHeight: '14px' }}>
				<div
					className='pro-head'
					style={{ alignItems: 'center', display: 'flex' }}
				>
					{user_detail && user_detail.profilePicture ? (
						<img
							src={user_detail.profilePicture}
							className='dashboard_avatar'
							style={{ objectFit: 'cover', objectPosition: 'center' }}
							alt='User Profile'
						/>
					) : (
						<img
							src={Avatar1}
							className='dashboard_avatar'
							alt='User Profile'
						/>
					)}
					<span className='d-inline'>
						<span
							className='mb-0 pb-0 mt-0 pt-0'
							style={{ fontSize: '12px', fontWeight: '700' }}
						>
							{user_detail
								? user_detail.role === 'BUSINESS'
									? `${user_detail.businessName}`
									: `${user_detail.firstName} ${user_detail.lastName}`
								: null}
						</span>
						<p
							className='mb-0 pb-0 mt-0 pt-0'
							style={{
								lineHeight: '16px',
								paddingLeft: '.1rem',
								fontSize: '11px',
							}}
						>
							{user_detail
								? user_detail.role === 'USER'
									? 'Personal'
									: user_detail.role === 'INDIVIDUAL'
									? 'Individual Host'
									: 'Business Host'
								: null}
						</p>
					</span>
				</div>
			</li>
			<li>
				<Dropdown className='drp-user'>
					<Dropdown.Toggle variant={'link'} id='dropdown-basic'>
						<FaChevronDown />
					</Dropdown.Toggle>
					<Dropdown.Menu className='profile-notification'>
						<ul className='pro-body'>
							<li>
								<Link to='/' className='dropdown-item'>
									<i className='feather icon-home' /> Home
								</Link>
							</li>
							<li>
								<Link to='/user/dashboard/profile' className='dropdown-item'>
									<i className='feather icon-user' /> Profile
								</Link>
							</li>
							{/* <li>
								<a href='#/' className='dropdown-item'>
									<i className='feather icon-mail' /> My Messages
								</a>
							</li> */}
							<li>
								<Link to='#' className='dropdown-item' onClick={logoutHandler}>
									<i className='feather icon-lock' /> Sign Out
								</Link>
							</li>
						</ul>
					</Dropdown.Menu>
				</Dropdown>
			</li>
		</ul>
	)
}

export default NavRight
