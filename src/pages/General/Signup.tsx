import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import OTPInput, { ResendOTP } from 'otp-input-react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import Registration4 from '../../assets/Registration4.jpg'
import logo from '../../assets/Logo_white.png'

const Signup = () => {
	const [verify, setVerify] = useState(false)
	const [showIndividual, setShowIndividual] = useState(true)
	const [OTP, setOTP] = useState('')

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
		setVerify(true)
	}
	return (
		<main className='about_page auth_page'>
			{verify ? (
				<section
					style={{ backgroundImage: `url(${Registration4})` }}
					className='about_page_bg auth_page_bg'
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
											A One-Time Password has been sent to shai****d@gmail.com
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
												<button className='btn btn-primary form-control'>
													Verify
												</button>
											</div>
										</form>
										<div className='mt-3 text-center resend'>
											<p>
												Didn’t receive a One-Time password?{' '}
												<ResendOTP
													maxTime={120}
													style={{}}
													onResendClick={() => console.log('Resend clicked')}
												/>
											</p>
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
					className='about_page_bg auth_page_bg'
				>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6 col-md-4'>
								<div
									className='logo_div'
									style={{ position: 'relative', marginTop: '1.5rem' }}
								>
									<img src={logo} alt='' className='img-fluid' />
								</div>
							</div>
							<div className='col-lg-6 col-md-8'>
								<div className='pebbles_form1_div'>
									<div className='pebbles_form'>
										<h4 className='text-center'> CREATE AN ACCOUNT </h4>
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
														<label htmlFor='fullName'>First Name</label>
														<input
															type='text'
															placeholder='First name here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Last Name</label>
														<input
															type='text'
															placeholder='Last name here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Email Address</label>
														<input
															type='email'
															placeholder='Email address here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Phone Number</label>
														<input
															type='telephone'
															placeholder='Phone Number here'
															className='form-control'
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
															/>
															<i
																className='fa fa-eye view'
																id='view2'
																onClick={viewHandler2}
															></i>
														</div>
													</div>
												</div>
												<div className='mt-3'>
													<button
														className='btn btn-primary form-control'
														onClick={(e) => submitHandler(e)}
													>
														Create Account
													</button>
												</div>
											</form>
										) : (
											<form>
												<div className='row'>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Company Name</label>
														<input
															type='text'
															placeholder='Company name here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Company Address</label>
														<input
															type='text'
															placeholder='Company address here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Email Address</label>
														<input
															type='email'
															placeholder='Email address here'
															className='form-control'
														/>
													</div>
													<div className='col-md-6'>
														<label htmlFor='fullName'>Phone Number</label>
														<input
															type='telephone'
															placeholder='Phone Number here'
															className='form-control'
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
															/>
															<i
																className='fa fa-eye view'
																id='view2'
																onClick={viewHandler2}
															></i>
														</div>
													</div>
												</div>
												<div className='mt-3'>
													<button
														className='btn btn-primary form-control '
														onClick={(e) => submitHandler(e)}
													>
														Create Account
													</button>
												</div>
											</form>
										)}

										<div className='mt-3 text-center'>
											<p>
												Already have an account?{' '}
												<Link to='/login' style={{ fontWeight: '500' }}>
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
