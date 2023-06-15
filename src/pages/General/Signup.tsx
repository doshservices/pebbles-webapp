import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	resetVerifyOtp,
	user_signup,
	verify_otp,
} from '../../features/authentication/authenticationSlice'
import OTPInput, { ResendOTP } from 'otp-input-react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import Registration4 from '../../assets/Registration4.jpg'
import logo from '../../assets/Logo_white.png'

const Signup = () => {
	const dispatch = useAppDispatch()
	let navigate = useNavigate()

	const { isLoading, verifyOtp } = useAppSelector((state) => state.auth)

	const [verify, setVerify] = useState(false)
	const [showIndividual, setShowIndividual] = useState(true)
	const [message, setMessage] = useState<string | null>(null)
	const [OTP, setOTP] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [businessName, setBusinessName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [role, setRole] = useState('')

	const viewHandler = () => {
		let pass = document.getElementById('password')
		let view = document.getElementById('view')
		const type = pass?.getAttribute('type') === 'password' ? 'text' : 'password'
		pass?.setAttribute('type', type)

		view?.classList.toggle('fa-eye-slash')
	}

	const viewHandler2 = () => {
		let pass = document.getElementById('confirm_password')
		let view = document.getElementById('view2')
		const type = pass?.getAttribute('type') === 'password' ? 'text' : 'password'
		pass?.setAttribute('type', type)

		view?.classList.toggle('fa-eye-slash')
	}

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const submitHandler = (e: any) => {
		e.preventDefault()
		// setRole(role)
		if (OTP) {
			dispatch(verify_otp({ token: OTP }))
			setVerify(true)
		} else {
			setMessage('Please type in your OTP.')
		}
	}

	const submitSignupHandler = (e: any, role: string) => {
		e.preventDefault()
		setRole(role)

		if (
			(firstName || businessName) &&
			email &&
			phoneNumber &&
			password &&
			confirmPassword
		) {
			if (password === confirmPassword) {
				dispatch(
					user_signup({
						businessName,
						firstName,
						lastName,
						email,
						googleSigned: true,
						password,
						phoneNumber,
						role,
					})
				)
				setVerify(true)
			} else {
				setMessage('Passwords do not match.')
			}
		} else {
			setMessage('All fields are required.')
		}
	}

	const submitSignupHandlerr = (role: string) => {
		setRole(role)
		dispatch(
			user_signup({
				businessName,
				firstName,
				lastName,
				email,
				googleSigned: true,
				password,
				phoneNumber,
				role,
			})
		)
	}

	useEffect(() => {
		if (verifyOtp) {
			navigate('/auth/login')
		}
	}, [verifyOtp])

	useEffect(() => {
		return () => {
			dispatch(resetVerifyOtp())
		}
	}, [dispatch])

	return (
		<main className='about_page auth_page'>
			{verify ? (
				<section
					style={{ backgroundImage: `url(${Registration4})` }}
					className='about_page_bg auth_page_bg pb-5'
				>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6 col-md-4'>
								<div
									className='logo_div'
									style={{ position: 'relative', marginTop: '1.5rem' }}
								>
									<Link to='/'>
										<img src={logo} alt='' className='img-fluid' />
									</Link>
								</div>
							</div>
							<div className='col-lg-6 col-md-8'>
								<div className='pebbles_form_div'>
									<div className='pebbles_form'>
										<h4 className='text-center mb-3'> VERIFY ACCOUNT </h4>
										<p className='text-center'>
											A One-Time Password has been sent to {email}
										</p>
										<form className='mt-5 pt-5'>
											<div className='d-flex justify-content-center'>
												<OTPInput
													value={OTP}
													onChange={setOTP}
													autoFocus
													OTPLength={6}
													otpType='number'
													disabled={false}
													secure
												/>
											</div>

											<div className='mt-5'>
												<button
													className='btn btn-primary form-control'
													onClick={(e) => submitHandler(e)}
													disabled={isLoading}
												>
													Verify
												</button>
											</div>
										</form>
										<div className='mt-3 text-center resend'>
											<div>
												<p>Didn’t receive a One-Time password? </p>
												<ResendOTP
													maxTime={120}
													style={{}}
													onResendClick={() => submitSignupHandlerr(role)}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<section
					style={{ backgroundImage: `url(${carouselBackground1})` }}
					className='about_page_bg auth_page_bg pb-5'
				>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6 col-md-4'>
								<div
									className='logo_div'
									style={{ position: 'relative', marginTop: '1.5rem' }}
								>
									<Link to='/'>
										<img src={logo} alt='' className='img-fluid' />
									</Link>
								</div>
							</div>
							<div className='col-lg-6 col-md-8'>
								<div className='pebbles_form1_div'>
									<div className='pebbles_form'>
										<h4 className='text-center'> CREATE AN ACCOUNT </h4>
										<p
											style={{
												fontSize: '11px',
												textAlign: 'center',
												color: '#0d6efd',
												fontWeight: '500',
											}}
										>
											Please select the appropriate user type
										</p>
										<div className='d-flex justify-content-center'>
											<div
												style={{
													border: '1px solid #2D2D2D',
													display: 'inline-block',
													padding: '.3rem',
													borderRadius: '.4rem',
													marginBottom: '1rem',
												}}
											>
												<button
													onClick={() => setShowIndividual(true)}
													className={
														showIndividual ? 'btn btn-primary' : 'btn btn_white'
													}
												>
													For Individual
												</button>
												<button
													onClick={() => setShowIndividual(false)}
													className={
														!showIndividual
															? 'btn btn-primary'
															: 'btn btn_white'
													}
												>
													For Business
												</button>
											</div>
										</div>
										{showIndividual ? (
											<form>
												<div className='row'>
													<div className='col-md-6'>
														<label htmlFor='firstName'>First Name</label>
														<input
															type='text'
															placeholder='First name here'
															className='form-control'
															onChange={(e) => setFirstName(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='lastName'>Last Name</label>
														<input
															type='text'
															placeholder='Last name here'
															className='form-control'
															onChange={(e) => setLastName(e.target.value)}
														/>
													</div>

													<div className='col-md-6'>
														<label htmlFor='email'>Email Address</label>
														<input
															type='email'
															placeholder='Email address here'
															className='form-control'
															onChange={(e) => setEmail(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='phoneNumber'>Phone Number</label>
														<input
															type='number'
															placeholder='Phone Number here'
															className='form-control'
															onChange={(e) => setPhoneNumber(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<div className='password_div'>
															<label htmlFor='fullName'>Password</label>
															<input
																placeholder='Password here'
																className='form-control'
																id='password'
																type='password'
																onChange={(e) => setPassword(e.target.value)}
															/>
															<i
																className='fa fa-eye view'
																id='view'
																onClick={viewHandler}
															></i>
														</div>
													</div>
													<div className='col-md-6'>
														<div className='confirm_password_div'>
															<label htmlFor='fullName'>Confirm Password</label>
															<input
																placeholder='Confirm Password here'
																className='form-control'
																id='confirm_password'
																type='password'
																onChange={(e) =>
																	setConfirmPassword(e.target.value)
																}
															/>
															<i
																className='fa fa-eye view'
																id='view2'
																onClick={viewHandler2}
															></i>
														</div>
													</div>
												</div>
												<div className='mt-5'>
													<button
														className='btn btn-primary form-control'
														onClick={(e) =>
															submitSignupHandler(e, 'INDIVIDUAL')
														}
														disabled={isLoading}
													>
														{isLoading ? (
															<i className='fas fa-spinner fa-spin'></i>
														) : (
															'Create Account'
														)}
													</button>
												</div>
												<p
													className='text-center mt-2'
													style={{ fontSize: '12px' }}
												>
													{message}
												</p>
											</form>
										) : (
											<form>
												<div className='row'>
													<div className='col-md-6'>
														<label htmlFor='firstName'>First Name</label>
														<input
															type='text'
															placeholder='First name here'
															className='form-control'
															onChange={(e) => setFirstName(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='lastName'>Last Name</label>
														<input
															type='text'
															placeholder='Last name here'
															className='form-control'
															onChange={(e) => setLastName(e.target.value)}
														/>
													</div>
													<div className='col-md-12'>
														<label htmlFor='fullName'>Business Name</label>
														<input
															type='text'
															placeholder='Business name here'
															className='form-control'
															required
															onChange={(e) => setBusinessName(e.target.value)}
														/>
													</div>

													<div className='col-md-6'>
														<label htmlFor='fullName'>Email Address</label>
														<input
															type='email'
															placeholder='Email address here'
															className='form-control'
															onChange={(e) => setEmail(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Phone Number</label>
														<input
															type='telephone'
															placeholder='Phone Number here'
															className='form-control'
															onChange={(e) => setPhoneNumber(e.target.value)}
														/>
													</div>
													<div className='col-md-6'>
														<div className='password_div'>
															<label htmlFor='fullName'>Password</label>
															<input
																placeholder='Password here'
																className='form-control'
																id='password'
																type='password'
																onChange={(e) => setPassword(e.target.value)}
															/>
															<i
																className='fa fa-eye view'
																id='view'
																onClick={viewHandler}
															></i>
														</div>
													</div>
													<div className='col-md-6'>
														<div className='confirm_password_div'>
															<label htmlFor='fullName'>Confirm Password</label>
															<input
																placeholder='Confirm Password here'
																className='form-control'
																id='confirm_password'
																type='password'
																onChange={(e) =>
																	setConfirmPassword(e.target.value)
																}
															/>
															<i
																className='fa fa-eye view'
																id='view2'
																onClick={viewHandler2}
															></i>
														</div>
													</div>
												</div>
												<div className='mt-5'>
													<button
														className='btn btn-primary form-control '
														onClick={(e) => submitSignupHandler(e, 'BUSINESS')}
														disabled={isLoading}
													>
														{isLoading ? (
															<i className='fas fa-spinner fa-spin'></i>
														) : (
															'Create Account'
														)}
													</button>
												</div>
												<p
													className='text-center mt-2'
													style={{ fontSize: '12px' }}
												>
													{message}
												</p>
											</form>
										)}

										<div className='mt-3 text-center'>
											<p>
												Already have an account?{' '}
												<Link to='/auth/login' style={{ fontWeight: '500' }}>
													Log In
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	)
}

export default Signup
