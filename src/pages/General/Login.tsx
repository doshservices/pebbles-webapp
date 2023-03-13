import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import logo from '../../assets/Logo_white.png'

const Login = () => {
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

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

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
											className='form-control'
										/>
										<div className='password_div'>
											<label htmlFor='fullName'>Password</label>
											<input
												placeholder='First name here'
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

										<div className='text-end mt-3'>
											<Link to='/forgot-password'>Forgot password?</Link>
										</div>
										<div
											className='form-input-group checkbox'
											style={{ alignItems: 'center', display: 'flex' }}
										>
											<input
												className='form-input'
												type='checkbox'
												name='checkbox'
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
											<button className='btn btn-primary form-control'>
												Log In
											</button>
										</div>
									</form>
									<div className='mt-3 text-center'>
										<p>
											Don’t have an account?{' '}
											<Link to='/signup' style={{ fontWeight: '500' }}>
												Create account
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
