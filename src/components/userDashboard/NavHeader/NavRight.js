import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
// import Avatar1 from '../../../assets/avatar-4.png'

const NavRight = () => {
	// const userAuth = useSelector((state) => state.userAuth)
	// const { userDetail } = userAuth

	const logoutHandler = (e) => {
		e.preventDefault()
		// dispatch(user_logout())
	}

	return (
		<ul className='navbar-nav ml-auto'>
			<li>
				<div className='pro-head'>
					{/* {userDetail && userDetail.profileImage ? (
						<img
							src={userDetail.profileImage}
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
					<span>
						{userDetail && userDetail.firstName + ' ' + userDetail.lastName}
					</span> */}
				</div>
			</li>
			<li>
				<Dropdown className='drp-user'>
					<Dropdown.Toggle variant={'link'} id='dropdown-basic'>
						<i className='icon feather icon-settings' />
					</Dropdown.Toggle>
					<Dropdown.Menu alignRight className='profile-notification'>
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
