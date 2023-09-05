import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import Logo2 from '../../assets/footer_logo.png'
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
								<a
									href='https://www.facebook.com/Pebbles.Signatures/?ref=page_internal'
									className='me-3'
								>
									<i className='icofont-facebook'></i>
								</a>
								<a
									href='https://twitter.com/pebblesignature?s=21&t=FULaJzEUkCahuTJMVL4XGA'
									className='me-3'
								>
									<i className='icofont-twitter'></i>
								</a>
								<a href='https://instagram.com/pebbles.signatures?igshid=MzRlODBiNWFlZA=='>
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
							<img src={Logo2} alt='' className='foot_logo' />
						</div>
						<div className='foot_links'>
							<div className='row justify-content-center'>
								<div className='col-lg-7 col-md-10 col-sm-11 col-12'>
									<div className='d-flex flex-wrap justify-content-center sv'>
										<Link to='/all-apartments' className=''>
											APARTMENT
										</Link>
										<Link to='/about-us' className=''>
											ABOUT
										</Link>
										<Link to='/contact' className=''>
											CONTACT
										</Link>
										<Link to='/auth/signup' className=''>
											BECOME A HOST
										</Link>
										<Link to='/privacy-policy' className=''>
											PRIVACY POLICY
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className=' foot_socials2'>
						<div className='social_links'>
							<a
								href='https://www.facebook.com/Pebbles.Signatures/?ref=page_internal'
								className='me-3'
							>
								<i className='icofont-facebook'></i>
							</a>
							<a
								href='https://twitter.com/pebblesignature?s=21&t=FULaJzEUkCahuTJMVL4XGA'
								className='me-3'
							>
								<i className='icofont-twitter'></i>
							</a>
							<a href='https://instagram.com/pebbles.signatures?igshid=MzRlODBiNWFlZA=='>
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
