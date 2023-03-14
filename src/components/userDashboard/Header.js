// import React, { useEffect } from 'react'
// import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
// import { GoSignOut } from 'react-icons/go'
// import { MdSettings } from 'react-icons/md'
// import { Link } from 'react-router-dom'
// import User from '../../assets/avatar.png'
// import { useDispatch, useSelector } from 'react-redux'
// // import { admin_logout } from '../redux/actions/authActions'

// const Header = (props) => {
// 	const dispatch = useDispatch()

// 	const logoutHandler = (e) => {
// 		e.preventDefault()
// 		// dispatch(admin_logout())
// 	}

// 	// const auth = useSelector((state) => state.auth)
// 	// const { detail } = auth

// 	return (
// 		<header>
// 			<div className='container header'>
// 				<button className='icons d-lg-none' onClick={props.openMenu}>
// 					<span></span>
// 					<span></span>
// 					<span></span>
// 				</button>
// 				<p className='welcome'>{props.title}</p>
// 				<ul className='user'>
// 					<UncontrolledDropdown nav className=''>
// 						<DropdownToggle nav className='profile'>
// 							{/* {detail && (
// 								<>
// 									<span className='user-name d-none d-lg-inline'>
// 										{detail.firstName} {detail.lastName}
// 									</span>
// 									{detail.profileImage ? (
// 										<img src={detail.profileImage} alt='user' />
// 									) : (
// 										<img src={User} alt='user' />
// 									)}
// 								</>
// 							)} */}
// 						</DropdownToggle>
// 						<DropdownMenu end className='profile-user'>
// 							<ul className='pro-body'>
// 								<li>
// 									<Link
// 										to='/dashboard/account/profile'
// 										className='dropdown-item'
// 									>
// 										<MdSettings />
// 										Profile
// 									</Link>
// 								</li>
// 								<li>
// 									<a href='#' className='dropdown-item' onClick={logoutHandler}>
// 										<GoSignOut /> Log Out
// 									</a>
// 								</li>
// 							</ul>
// 						</DropdownMenu>
// 					</UncontrolledDropdown>
// 				</ul>
// 			</div>
// 		</header>
// 	)
// }

// export default Header
