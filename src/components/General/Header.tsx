import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { HiMenuAlt1 } from 'react-icons/hi'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Dropdown, Container } from 'react-bootstrap'
import '../../styles/component.css'
import logo_blue from '../../assets/Logo_blue.png'
import logo from '../../assets/Logo_white.png'
// import logo from '../../assets/logo/p_logo_white_l.png'
import logo_small from '../../assets/Logo_small.png'
import apartment_black from '../../assets/apartment_black.png'
import apartment from '../../assets/apartment.png'
import events from '../../assets/events.png'
import food_black from '../../assets/food_black.png'
import food from '../../assets/food.png'
import laundry_black from '../../assets/laundry_black.png'
import laundry from '../../assets/laundry.png'
import ride_black from '../../assets/ride_black.png'
import ride from '../../assets/ride.png'
import profileCircle from '../../assets/profile-circle.png'
import profileCircleBlack from '../../assets/profile-circle-black.png'
import '../../styles/header.css'
import { reset } from '../../features/authentication/authenticationSlice'
import { bookingReset } from '../../features/booking/bookingSlice'
import { apartmentReset } from '../../features/apartment/apartmentSlice'
import { notificationReset } from '../../features/notification/notificationSlice'
import { MdMenu } from 'react-icons/md'

const Header = ({ type }: { type: number }) => {
	const dispatch = useAppDispatch()

	const [colorChange, setColorchange] = useState(false)
	const changeNavbarColor = () => {
		if (window.scrollY >= 80) {
			setColorchange(true)
		} else {
			setColorchange(false)
		}
	}
	window.addEventListener('scroll', changeNavbarColor)

	const { user_detail } = useAppSelector((state) => state.auth)

	const logoutHandler = (e: any) => {
		e.preventDefault()
		dispatch(reset())
		dispatch(bookingReset())
		dispatch(apartmentReset())
		dispatch(notificationReset())
	}

	return (
		<header className='fixed-top'>
			{type === 1 ? (
				<>
					<Navbar
						className={
							colorChange
								? 'nav_light def_navbar1 d-nonee'
								: 'def_navbar1 d-showw'
						}
						expand='lg'
						collapseOnSelect
					>
						<Container style={{ zIndex: 99999999, position: 'relative' }}>
							<div className='social_links'>
								<a
									href='https://www.facebook.com/Pebbles.Signatures/?ref=page_internal'
									className='me-3 '
								>
									<i className='icofont-facebook'></i>
								</a>
								<a
									href='https://instagram.com/pebbles.signatures?igshid=MzRlODBiNWFlZA=='
									className='me-3 '
								>
									<i className='icofont-twitter'></i>
								</a>
								{/* <a href='/' className='me-3 '>
									<i className='icofont-linkedin'></i>
								</a> */}
								<a
									href='https://twitter.com/pebblesignature?s=21&t=FULaJzEUkCahuTJMVL4XGA'
									className=''
								>
									<i className='icofont-instagram'></i>
								</a>
							</div>

							<div>
								<Link to='/'>
									<img src={logo_small} alt='' className='logo' />
								</Link>
							</div>

							<Navbar.Toggle aria-controls='basic-navbar-nav'>
								<HiMenuAlt1 />
							</Navbar.Toggle>
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='ms-auto nav_box'>
									{!user_detail && (
										<LinkContainer to='/auth/signup' className='host_btn'>
											<Nav.Link> Become a Host </Nav.Link>
										</LinkContainer>
									)}

									<Dropdown className='mr-0'>
										<Dropdown.Toggle
											variant=''
											className=''
											id='dropdown-basic'
										>
											{!user_detail ? (
												<>
													<MdMenu color='white' size='22' />
													<img
														src={profileCircle}
														alt=''
														className='prof_circle profile_light'
													/>
													<img
														src={profileCircleBlack}
														alt=''
														className='prof_circle profile_dark'
													/>
												</>
											) : (
												<>
													{user_detail?.profilePicture ? (
														<>
															<MdMenu color='white' size='22' />

															<img
																src={user_detail?.profilePicture}
																alt=''
																style={{
																	objectFit: 'cover',
																	borderRadius: '50%',
																}}
																className='prof_circle profile_light'
															/>
															<img
																src={user_detail?.profilePicture}
																alt=''
																style={{
																	objectFit: 'cover',
																	borderRadius: '50%',
																}}
																className='prof_circle profile_dark'
															/>
														</>
													) : (
														<>
															<MdMenu color='white' size='22' />

															<img
																src={profileCircle}
																alt=''
																className='prof_circle profile_light'
															/>
															<img
																src={profileCircleBlack}
																alt=''
																className='prof_circle profile_dark'
															/>
														</>
													)}
												</>
											)}
										</Dropdown.Toggle>

										<Dropdown.Menu
											align={'end'}
											className='header_dropdown_menu'
										>
											{!user_detail ? (
												<>
													<div className='drop_btn_div'>
														<LinkContainer to={`/auth/login`}>
															<Nav.Link className='drop_btn btn'>
																Login
															</Nav.Link>
														</LinkContainer>
													</div>
													<hr />
													<div className='d-flex justify-content-center flex-column align-items-center drop_btn_div2'>
														<span>Don’t have an account?</span>
														<LinkContainer to={`/auth/user/signup`}>
															<Nav.Link className=''>Create Account</Nav.Link>
														</LinkContainer>
													</div>
												</>
											) : (
												<div className='text-center'>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/home`}>
															<Nav.Link className=''> My Dashboard </Nav.Link>
														</LinkContainer>
													</div>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/my-bookings`}>
															<Nav.Link className=''> Bookings </Nav.Link>
														</LinkContainer>
													</div>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/wishlist`}>
															<Nav.Link className=''>Saved Apartments</Nav.Link>
														</LinkContainer>
													</div>
													<hr />

													<div className='text-center'>
														<a
															href='#'
															onClick={logoutHandler}
															className='logout'
														>
															Log Out
														</a>
													</div>
												</div>
											)}
										</Dropdown.Menu>
									</Dropdown>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>

					<div
						className={colorChange ? 'nav_light def_navbar2' : 'def_navbar2'}
					>
						<div className='container'>
							<div className='row'>
								<div className='col-lg-4 col-md-6 col-6'>
									<div className='row'>
										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/all-apartments' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_light'
														src={apartment}
														alt=''
													/>
													<img
														className='sub_img_dark'
														src={apartment_black}
														alt=''
													/>
												</div>
												<span> APARTMENT </span>
											</Link>
										</div>

										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/ride' className='js_scroll'>
												<div className='text-center'>
													<img className='sub_img_light' src={ride} alt='' />
													<img
														className='sub_img_dark'
														src={ride_black}
														alt=''
													/>
												</div>
												<span> RIDE </span>
											</Link>
										</div>

										<div className='col-md-4 col navLink_div'>
											<Link to='/add-ons/laundry' className='js_scroll'>
												<div className='text-center'>
													<img className='sub_img_light' src={laundry} alt='' />
													<img
														className='sub_img_dark'
														src={laundry_black}
														alt=''
													/>
												</div>
												<span> LAUNDRY </span>
											</Link>
										</div>
									</div>
								</div>

								<div className='col-lg-4 text-center center_logo'>
									<Link to='/'>
										<img src={logo} alt='' className='center_logo1' />
										<img src={logo_blue} alt='' className='center_logo2' />
									</Link>
								</div>

								<div className='col-lg-4 col-md-6 col-6'>
									<div className='row'>
										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/food' className='js_scroll'>
												<div className='text-center'>
													<img className='sub_img_light' src={food} alt='' />
													<img
														className='sub_img_dark'
														src={food_black}
														alt=''
													/>
												</div>
												<span> Food </span>
											</Link>
										</div>

										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/voucher' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_light'
														src={apartment}
														alt=''
													/>
													<img
														className='sub_img_dark'
														src={apartment_black}
														alt=''
													/>
												</div>
												<span> VOUCHER </span>
											</Link>
										</div>

										<div className='col-md-4 col navLink_div'>
											<Link to='/events' className='js_scroll'>
												<div className='text-center'>
													<img className='sub_img_light' src={events} alt='' />
													<i className='fa fa-calendar sub_img_dark' />
												</div>
												<span> EVENTS </span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<Navbar
						className={colorChange ? 'nav_light def_navbar3' : 'def_navbar3 '}
						expand='lg'
						collapseOnSelect
					>
						<Container style={{ zIndex: 99999999, position: 'relative' }}>
							<div>
								<Link to='/'>
									<img src={logo_blue} alt='' className='logo' />
								</Link>
							</div>

							<Navbar.Toggle aria-controls='basic-navbar-nav'>
								<HiMenuAlt1 />
							</Navbar.Toggle>
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='ms-auto nav_box'>
									{!user_detail && (
										<LinkContainer to='/auth/signup' className='host_btn'>
											<Nav.Link> Become a Host </Nav.Link>
										</LinkContainer>
									)}

									<Dropdown className=''>
										<Dropdown.Toggle
											variant=''
											className=''
											id='dropdown-basic'
										>
											{!user_detail ? (
												<>
													<MdMenu color='#999' size='22' />
													<img
														src={profileCircleBlack}
														alt=''
														className='prof_circle profile_dark'
													/>
												</>
											) : (
												<>
													<MdMenu color='#999' size='22' />
													{user_detail?.profilePicture ? (
														<img
															src={user_detail?.profilePicture}
															alt=''
															style={{
																objectFit: 'cover',
																borderRadius: '50%',
															}}
															className='prof_circle profile_dark'
														/>
													) : (
														<img
															src={profileCircleBlack}
															alt=''
															className='prof_circle profile_dark'
														/>
													)}
												</>
											)}
										</Dropdown.Toggle>

										<Dropdown.Menu
											align={'end'}
											className='header_dropdown_menu'
										>
											{!user_detail ? (
												<>
													<div className='drop_btn_div'>
														<LinkContainer to={`/auth/login`}>
															<Nav.Link className='drop_btn btn'>
																Login
															</Nav.Link>
														</LinkContainer>
													</div>
													<hr />
													<div className='d-flex justify-content-center flex-column align-items-center drop_btn_div2'>
														<span>Don’t have an account?</span>
														<LinkContainer to={`/auth/user/signup`}>
															<Nav.Link className=''>Create Account</Nav.Link>
														</LinkContainer>
													</div>
												</>
											) : (
												<div className='text-center'>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/home`}>
															<Nav.Link className=''> My Dashboard </Nav.Link>
														</LinkContainer>
													</div>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/my-bookings`}>
															<Nav.Link className=''> Bookings </Nav.Link>
														</LinkContainer>
													</div>
													<div className='drop_btn_div3'>
														<LinkContainer to={`/user/dashboard/wishlist`}>
															<Nav.Link className=''>Saved Apartments</Nav.Link>
														</LinkContainer>
													</div>
													<hr />

													<div className='text-center'>
														<a
															href='#'
															onClick={logoutHandler}
															className='logout'
														>
															Log Out
														</a>
													</div>
												</div>
											)}
										</Dropdown.Menu>
									</Dropdown>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>

					<div
						className={colorChange ? 'nav_light def_navbar4' : 'def_navbar4'}
					>
						<div className='container'>
							<div className='row'>
								<div className='col-lg-4 col-md-6 col-6'>
									<div className='row'>
										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/all-apartments' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_dark'
														src={apartment_black}
														alt=''
													/>
												</div>
												<span> APARTMENT </span>
											</Link>
										</div>

										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/ride' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_dark'
														src={ride_black}
														alt=''
													/>
												</div>
												<span> RIDE </span>
											</Link>
										</div>

										<div className='col-md-4 col navLink_div'>
											<Link to='/add-ons/laundry' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_dark'
														src={laundry_black}
														alt=''
													/>
												</div>
												<span> LAUNDRY </span>
											</Link>
										</div>
									</div>
								</div>

								<div className='col-lg-4 text-center center_logo'>
									<img src={logo_blue} alt='' className='center_logo2' />
								</div>

								<div className='col-lg-4 col-md-6 col-6'>
									<div className='row'>
										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/food' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_dark'
														src={food_black}
														alt=''
													/>
												</div>
												<span> Food </span>
											</Link>
										</div>

										<div className='col-md-4 col b_r_w navLink_div'>
											<Link to='/add-ons/voucher' className='js_scroll'>
												<div className='text-center'>
													<img
														className='sub_img_dark'
														src={apartment_black}
														alt=''
													/>
												</div>
												<span> VOUCHER </span>
											</Link>
										</div>

										<div className='col-md-4 col navLink_div'>
											<Link to='events' className='js_scroll'>
												<div className='text-center'>
													<i className='fa fa-calendar sub_img_dark' />
												</div>
												<span> EVENTS </span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</header>
	)
}

export default Header
