import React, { useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OTPInput, { ResendOTP } from 'otp-input-react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import Registration4 from '../../assets/Registration4.jpg'
import logo from '../../assets/Logo_white.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	forgot_password,
	get_otp,
} from '../../features/authentication/authenticationSlice'

const ForgotPassword = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { isLoading } = useAppSelector((state) => state.auth)

	const [verify, setVerify] = useState(false)
	const [OTP, setOTP] = useState('')
	const [email, setEmail] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState<string | null>(null)

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

	const submitSignupHandler = (e: any) => {
		e.preventDefault()
		if (email) {
			dispatch(get_otp({ email }))

			setTimeout(() => {
				setVerify(true)
				setMessage(null)
			}, 1000)
		} else {
			setMessage('The email field is required.')
		}
	}

	const submitSignupHandlerr = () => {
		if (email) {
			dispatch(get_otp({ email }))

			setTimeout(() => {
				setVerify(true)
			}, 1000)
		} else {
			setMessage('The email field is required.')
		}
	}

	const submitHandler = (e: any) => {
		e.preventDefault()

		if (newPassword && confirmPassword) {
			if (newPassword === confirmPassword) {
				let data = {
					newPassword,
					otp: OTP,
				}
				dispatch(forgot_password(data))

				setTimeout(() => {
					navigate('/auth/login')
				}, 1000)
			} else {
				setMessage("Passwords don't match")
			}
		} else {
			setMessage('Please fill out all  fields.')
		}
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
											<div className='col-md-12'>
												<div className='password_div'>
													<label htmlFor='fullName'>Password</label>
													<input
														placeholder='Password here'
														className='form-control'
														id='password'
														type='password'
														onChange={(e) => setNewPassword(e.target.value)}
													/>
													<i
														className='fa fa-eye view'
														id='view'
														onClick={viewHandler}
													></i>
												</div>
											</div>
											<div className='col-md-12'>
												<div className='confirm_password_div'>
													<label htmlFor='fullName'>Confirm Password</label>
													<input
														placeholder='Confirm Password here'
														className='form-control'
														id='confirm_password'
														type='password'
														onChange={(e) => setConfirmPassword(e.target.value)}
													/>
													<i
														className='fa fa-eye view'
														id='view2'
														onClick={viewHandler2}
													></i>
												</div>
											</div>

											<div className='mt-5'>
												<button
													className='btn btn-primary form-control'
													onClick={submitHandler}
													disabled={isLoading}
												>
													{isLoading ? (
														<i className='fas fa-spinner fa-spin'></i>
													) : (
														'Verify'
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
										<div className='mt-3 text-center resend'>
											<div>
												Didn’t receive a One-Time password?{' '}
												<ResendOTP
													maxTime={120}
													style={{}}
													onResendClick={() => submitSignupHandlerr()}
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
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</div>
											<div className='mt-5'>
												<button
													className='btn btn-primary form-control'
													onClick={(e) => submitSignupHandler(e)}
													disabled={isLoading}
												>
													{isLoading ? (
														<i className='fas fa-spinner fa-spin'></i>
													) : (
														'Reset Password'
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

										<div className='mt-3 text-center'>
											<p>
												Remember password now?{' '}
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

export default ForgotPassword
