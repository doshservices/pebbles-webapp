import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	keepUserLoggedIn,
	user_login,
} from '../../features/authentication/authenticationSlice'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import logo from '../../assets/Logo_white.png'
import { toast } from 'react-hot-toast'

const Login = () => {
	const dispatch = useAppDispatch()
	let navigate = useNavigate()

	const { user_detail, token, isLoading, keepLoggedIn } = useAppSelector(
		(state) => state.auth
	)

	const [email, setEmail] = useState(keepLoggedIn ? keepLoggedIn?.email : '')
	const [password, setPassword] = useState(
		keepLoggedIn ? keepLoggedIn?.password : ''
	)
	const [keepState, setKeepState] = useState(
		keepLoggedIn && keepLoggedIn?.value ? true : false
	)

	const viewHandler = () => {
		let pass = document.getElementById('password')
		let view = document.getElementById('view')
		const type = pass?.getAttribute('type') === 'password' ? 'text' : 'password'
		pass?.setAttribute('type', type)

		view?.classList.toggle('fa-eye-slash')
	}

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	const keepLoggedInHandler = () => {
		let value = !keepState

		if (email && password) {
			let data = {
				password: value ? password : '',
				email: value ? email : '',
				value: value,
			}
			dispatch(keepUserLoggedIn(data))
		}
		if (value) toast.success('Login details saved')
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const submitHandler = (e: any) => {
		e.preventDefault()
		dispatch(
			user_login({
				loginId: email,
				password,
			})
		)
	}

	useEffect(() => {
		if (user_detail) {
			navigate('/user/dashboard/home')
		}
	}, [user_detail])

	return (
		<main className='about_page auth_page'>
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
							<div className='pebbles_form_div'>
								<div className='pebbles_form'>
									<h4 className='text-center'> WELCOME BACK </h4>
									<form>
										<label htmlFor='fullName'>Email Address</label>
										<input
											type='text'
											placeholder='Email address here'
											value={email}
											className='form-control'
											onChange={(e) => setEmail(e.target.value)}
										/>
										<div className='password_div'>
											<label htmlFor='fullName'>Password</label>
											<input
												placeholder='Password here'
												className='form-control'
												id='password'
												value={password}
												type='password'
												onChange={(e) => setPassword(e.target.value)}
											/>
											<i
												className='fa fa-eye view'
												id='view'
												onClick={viewHandler}
											></i>
										</div>

										<div className='text-end mt-3'>
											<Link to='/auth/forgot-password'>Forgot password?</Link>
										</div>
										<div
											className='form-input-group checkbox'
											style={{ alignItems: 'center', display: 'flex' }}
										>
											<input
												className='form-input'
												type='checkbox'
												name='checkbox'
												defaultChecked={keepState}
												onClick={keepLoggedInHandler}
											/>
											<label
												className='form-input-label'
												htmlFor='checkbox'
												style={{
													fontSize: '12px',
													marginBottom: '2rem',
													marginLeft: '.3rem',
												}}
											>
												Keep me logged in
											</label>
										</div>
										<div className='mt-1'>
											<button
												className='btn btn-primary form-control'
												onClick={(e) => submitHandler(e)}
												disabled={isLoading}
											>
												{isLoading ? (
													<i className='fas fa-spinner fa-spin'></i>
												) : (
													'Log In'
												)}
											</button>
										</div>
									</form>
									<div className='mt-3 text-center'>
										<p>
											Don’t have an account?{' '}
											<Link
												to='/auth/user/signup'
												style={{ fontWeight: '500' }}
											>
												Create account
											</Link>
										</p>
										<p>
											Want to signup as a host?{' '}
											<Link to='/auth/signup' style={{ fontWeight: '500' }}>
												Become a host
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login
