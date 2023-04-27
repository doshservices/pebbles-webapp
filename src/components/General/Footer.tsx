import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import '../../styles/component.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { post_newsletter } from '../../features/notification/notificationSlice'

const Footer = () => {
	const dispatch = useAppDispatch()

	const [email, setEmail] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [message, setMessage] = useState<string | null>(null)

	const { isUpdating } = useAppSelector((state) => state.notification)

	const submitHandler = (e: any) => {
		e.preventDefault()
		let validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (email && email.match(validRegex))
			dispatch(post_newsletter({ email, name }))
		else setMessage('Please enter a valid email')
	}

	return (
		<footer>
			<div className='footer1'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4 foot_socials'>
							<h6> SOCIAL MEDIA </h6>
							<p> FOLLOW PEBBLES SIGNATURE </p>
							<div className='social_links'>
								<a href='/' className='me-3'>
									<i className='icofont-facebook'></i>
								</a>
								<a href='/' className='me-3'>
									<i className='icofont-twitter'></i>
								</a>
								<a href='/' className='me-3'>
									<i className='icofont-linkedin'></i>
								</a>
								<a href='/'>
									<i className='icofont-instagram'></i>
								</a>
							</div>
						</div>

						<div className='col-md-8 footer_align_right'>
							<h6> NEWSLETTER </h6>
							<p>
								subscribe to our newsletter to recieve new offers and promotions
							</p>
							<div className='row'>
								<div className='col-lg-6 col-md-4'></div>
								<div className='col-lg-6 col-md-8'>
									<div className='input-group mb-3 input_div'>
										<input
											type='email'
											className='form-control'
											placeholder=''
											aria-label='Enter email'
											onChange={(e) => setEmail(e.target.value)}
										/>
										<div style={{ position: 'absolute', left: '-2000px' }}>
											<input
												type='text'
												onChange={(e) => setName(e.target.value)}
											/>
										</div>

										<button
											className='btn btn-outline-secondary'
											onClick={submitHandler}
											type='button'
											disabled={isUpdating}
										>
											{isUpdating ? (
												<i className='fas fa-spinner fa-spin'></i>
											) : (
												'SEND'
											)}
										</button>
									</div>
									<p
										style={{
											fontSize: '12px',
											color: '#f00',
											textTransform: 'lowercase',
										}}
									>
										{message}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='footer2'>
				<div className='container'>
					<div className='text-center'>
						<div className='mb-4'>
							<img src={Logo} alt='' />
						</div>
						<div className='foot_links'>
							<div className='row justify-content-center'>
								<div className='col-md-6 col-8'>
									<div className='row sv'>
										<div className='col'>
											<Link to='/apartments' className=''>
												APARTMENT
											</Link>
										</div>
										<div className='col'>
											<Link to='/about-us' className=''>
												ABOUT
											</Link>
										</div>
										<div className='col'>
											<Link to='/contact' className=''>
												CONTACT
											</Link>
										</div>
										<div className='col'>
											<Link to='/become-a-host' className=''>
												BECOME A HOST
											</Link>
										</div>
										<div className='col'>
											<Link to='/privacy-policy' className=''>
												PRIVACY POLICY
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className=' foot_socials2'>
						<div className='social_links'>
							<a href='/' className='me-3'>
								<i className='icofont-facebook'></i>
							</a>
							<a href='/' className='me-3'>
								<i className='icofont-twitter'></i>
							</a>
							<a href='/' className='me-3'>
								<i className='icofont-linkedin'></i>
							</a>
							<a href='/'>
								<i className='icofont-instagram'></i>
							</a>
						</div>
					</div>
					<div className='foot_para'>
						<div className='row'>
							<div className='col-md-6'>
								<p> &copy; 2023 Pebbles Signature, All Rights Reserved </p>
							</div>
							<div className='col-md-6 align_right'>
								<Link to=''> Site map </Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
