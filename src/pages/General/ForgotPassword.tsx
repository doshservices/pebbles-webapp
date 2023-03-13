import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import OTPInput, { ResendOTP } from 'otp-input-react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import Registration4 from '../../assets/Registration4.jpg'
import logo from '../../assets/Logo_white.png'

const ForgotPassword = () => {
	const [verify, setVerify] = useState(false)
	const [OTP, setOTP] = useState('')

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
									<img src={logo} alt='' className='img-fluid' />
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
									<Link to='/'>
										<img src={logo} alt='' className='img-fluid' />
									</Link>
								</div>
							</div>
							<div className='col-lg-6 col-md-8'>
								<div className='pebbles_form1_div'>
									<div className='pebbles_form'>
										<h4 className='text-center mb-3 mt-5'> FORGOT PASSWORD</h4>
										<p className='text-center'>
											No worries, input your email address below, we’ll send you
											reset instructions.
										</p>

										<form>
											<div className='row'>
												<div className='col-md-12'>
													<label htmlFor='fullName'>Email Address</label>
													<input
														type='email'
														placeholder='Email address here'
														className='form-control'
													/>
												</div>
											</div>
											<div className='mt-5'>
												<button
													className='btn btn-primary form-control'
													onClick={(e) => submitHandler(e)}
												>
													Reset Password
												</button>
											</div>
										</form>

										<div className='mt-3 text-center'>
											<p>
												Remember password now?{' '}
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

export default ForgotPassword
