import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { HiMenuAlt1 } from 'react-icons/hi'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Dropdown, Container } from 'react-bootstrap'
import '../../styles/component.css'
import logo_blue from '../../assets/Logo_blue.png'
import logo from '../../assets/Logo.png'
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
								<a href='/' className='me-3 '>
									<i className='icofont-facebook'></i>
								</a>
								<a href='/' className='me-3 '>
									<i className='icofont-twitter'></i>
								</a>
								<a href='/' className='me-3 '>
									<i className='icofont-linkedin'></i>
								</a>
								<a href='/' className=''>
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

									<Dropdown className=''>
										<Dropdown.Toggle
											variant=''
											className=''
											id='dropdown-basic'
										>
											{!user_detail ? (
												<>
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
											style={{ padding: '.5rem .4rem' }}
										>
											{!user_detail ? (
												<LinkContainer to={`/auth/login`}>
													<Nav.Link className=''> Login </Nav.Link>
												</LinkContainer>
											) : (
												<div className='text-center'>
													<LinkContainer to={`/user/dashboard/home`}>
														<Nav.Link className=''> My Dashboard </Nav.Link>
													</LinkContainer>
													<div className='text-center'>
														<button
															className='btn btn-primary'
															style={{
																backgroundColor: 'white',
																border: '1px solid red',
																color: 'red',
																fontSize: '12px',
															}}
															onClick={logoutHandler}
														>
															Sign Out
														</button>
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
												<img
													src={profileCircleBlack}
													alt=''
													className='prof_circle profile_dark'
												/>
											) : (
												<>
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
											style={{ padding: '.5rem 1rem' }}
										>
											{!user_detail ? (
												<LinkContainer to={`/auth/login`}>
													<Nav.Link className=''> Login </Nav.Link>
												</LinkContainer>
											) : (
												<div className='text-center'>
													<LinkContainer to={`/user/dashboard/home`}>
														<Nav.Link className=''> My Dashboard </Nav.Link>
													</LinkContainer>
													<div className='text-center'>
														<button
															className='btn btn-primary'
															style={{
																backgroundColor: 'white',
																border: '1px solid red',
																color: 'red',
																fontSize: '12px',
															}}
															onClick={logoutHandler}
														>
															Sign Out
														</button>
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
