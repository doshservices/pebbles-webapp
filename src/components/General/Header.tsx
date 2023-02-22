import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { HiMenuAlt1 } from 'react-icons/hi'
import {
	FaMapMarker,
	FaMapPin,
	FaRegUserCircle,
	FaTshirt,
} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Dropdown, Container, Image } from 'react-bootstrap'
// import { user_logout } from '../../redux/actions/userAuthActions'
import '../../styles/component.css'
import logo from '../../assets/Logo.png'

const Header = () => {
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

	// const userAuth = useSelector((state) => state.userAuth)
	// const { userDetail } = userAuth

	const logoutHandler = (e: any) => {
		e.preventDefault()
		// dispatch(user_logout())
	}

	useEffect(() => {
		console.log('scroll value', window.scrollY)
	}, [])

	return (
		<header className='fixed-top'>
			<Navbar
				className={colorChange ? 'nav_dark' : ''}
				expand='md'
				collapseOnSelect
			>
				<Container>
					<div>
						<a href='/' className='mr-3 text-white'>
							<i className='icofont-facebook'></i>
						</a>
						<a href='/' className='mr-3 text-white'>
							<i className='icofont-twitter'></i>
						</a>
						<a href='/' className='mr-3 text-white'>
							<i className='icofont-linkedin'></i>
						</a>
						<a href='/' className='text-white'>
							<i className='icofont-instagram'></i>
						</a>
					</div>
					<Navbar.Toggle aria-controls='basic-navbar-nav'>
						<HiMenuAlt1 />
					</Navbar.Toggle>
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/professionals'>
								<Nav.Link className='js-scroll'> Professionals </Nav.Link>
							</LinkContainer>

							<Dropdown className='js-scroll'>
								<Dropdown.Toggle
									variant=''
									className='js-scroll2 pt-2 camp_btn'
									id='dropdown-basic'
								>
									<FaRegUserCircle color='#fff' />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<LinkContainer to={`/login`}>
										<Nav.Link className=''> Login </Nav.Link>
									</LinkContainer>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div className={colorChange ? 'bg_white' : ''}>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4'>
							<div className='row'>
								<div className='col-md-4'>
									<Link to=''>
										<i className='icofont-google-map'></i>
										<span> APARTMENT </span>
									</Link>
								</div>

								<div className='col-md-4'>
									<Link to=''>
										<i className='icofont-car'></i>
										<span> RIDE </span>
									</Link>
								</div>

								<div className='col-md-4'>
									<Link to=''>
										<FaTshirt />
										<span> LAUNDRY </span>
									</Link>
								</div>
							</div>
						</div>

						<div className='col-md-4'>
							<img src={logo} alt='' />
						</div>

						<div className='col-md-4'>
							<div className='row'>
								<div className='col-md-4'>
									<Link to=''>
										<i className='icofont-google-map'></i>
										<span> APARTMENT </span>
									</Link>
								</div>

								<div className='col-md-4'>
									<Link to=''>
										<i className='icofont-car'></i>
										<span> RIDE </span>
									</Link>
								</div>

								<div className='col-md-4'>
									<Link to=''>
										<FaTshirt />
										<span> LAUNDRY </span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
