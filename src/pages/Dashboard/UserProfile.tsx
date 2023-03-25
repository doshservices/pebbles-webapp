import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import picture from '../../assets/fav.jpg'
import { Country, State, City } from 'country-state-city'

const UserProfile = () => {
	const dispatch = useAppDispatch()
	const { user_detail } = useAppSelector((state) => state.auth)

	const [firstName, setFirstName] = useState(
		user_detail ? user_detail.firstName : ''
	)
	const [email, setEmail] = useState(user_detail ? user_detail.email : '')
	const [lastName, setLastName] = useState(
		user_detail ? user_detail.lastName : ''
	)
	const [phoneNumber, setPhoneNumber] = useState(
		user_detail ? user_detail.phoneNumber : ''
	)
	const [address, setAddress] = useState(user_detail ? user_detail.address : '')
	const [state, setState] = useState(user_detail ? user_detail.state : '')
	const [country, setCountry] = useState(
		user_detail ? user_detail.country : 'NG'
	)
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	console.log(Country.getAllCountries())
	console.log(State.getAllStates())

	const viewHandler = () => {
		let pass = document.getElementById('password')
		let view = document.getElementById('view')
		const type = pass?.getAttribute('type') === 'password' ? 'text' : 'password'
		pass?.setAttribute('type', type)

		view?.classList.toggle('fa-eye-slash')
	}

	const viewHandler1 = () => {
		let pass = document.getElementById('new_password')
		let view = document.getElementById('view1')
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

	const updateHandler = (e) => {
		e.preventDefault()
	}

	console.log('====================================')
	console.log('user_detail', user_detail)
	console.log('====================================')

	return (
		<main className='dashboard'>
			<div className='row justify-content-center'>
				<div className='col-lg-9 col-11'>
					<div className='dashboard_pad'>
						<div className='d-flex' style={{}}>
							<img
								src={picture}
								alt=''
								style={{ width: '6rem', height: '6rem', borderRadius: '50%' }}
							/>
						</div>
						<div
							className='pebbles_form pb-5 mb-2'
							style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
						>
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-md-6'>
										<label htmlFor='firstName'> First Name </label>
										<input
											type='text'
											value={firstName}
											placeholder='Enter First name here'
											className='form-control'
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
									<div className='col-md-6'>
										<label htmlFor='lastName'> Last Name </label>
										<input
											type='text'
											placeholder='Enter Last name here'
											value={lastName}
											className='form-control'
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
									<div className='col-md-12'>
										<label htmlFor='address'> Address </label>
										<input
											type='text'
											placeholder='Enter Address here'
											value={address}
											className='form-control'
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
									<div className='col-md-6'>
										<label htmlFor='country'> Country </label>
										<select
											className='form-select'
											value={country}
											defaultValue={country}
											onChange={(e) => setCountry(e.target.value)}
										>
											<option value=''>Select Country</option>
											{Country.getAllCountries().map((item, index) => (
												<option value={item.isoCode} key={index}>
													{item.flag} {item.name}
												</option>
											))}
										</select>
									</div>
									<div className='col-md-6'>
										<label htmlFor='state'> State </label>
										<select
											className='form-select'
											onChange={(e) => setState(e.target.value)}
										>
											<option value=''>Select State</option>
											{State.getStatesOfCountry(country).map((item, index) => (
												<option value={item.name} key={index}>
													{item.name}
												</option>
											))}
										</select>
									</div>

									<div className='col-12 d-flex justify-content-end'>
										<button
											className='btn btn-primary form-control'
											onClick={(e) => updateHandler(e)}
										>
											Edit
										</button>
									</div>
								</div>
							</form>
						</div>

						<div
							className='pebbles_form pb-5 mb-3'
							style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
						>
							<h5 className='pt-4'>Password</h5>
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-md-5'>
										<div className='password_div'>
											<label htmlFor='fullName'>Current Password</label>
											<input
												placeholder='Enter Current Password here'
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
									<div className='col-md-7'></div>
									<div className='col-md-5'>
										<div className='password_div'>
											<label htmlFor='new_password'>New Password</label>
											<input
												placeholder='Enter New Password here'
												className='form-control'
												id='new_password'
												type='password'
												autoComplete='off'
												onChange={(e) => setNewPassword(e.target.value)}
											/>
											<i
												className='fa fa-eye view'
												id='view1'
												onClick={viewHandler1}
											></i>
										</div>
									</div>
									<div className='col-md-7'></div>
									<div className='col-md-5'>
										<div className='password_div'>
											<label htmlFor='confirm_password'>Confirm Password</label>
											<input
												placeholder='Confirm Password here'
												className='form-control'
												id='confirm_password'
												type='password'
												autoComplete='off'
												onChange={(e) => setNewPassword(e.target.value)}
											/>
											<i
												className='fa fa-eye view'
												id='view2'
												onClick={viewHandler2}
											></i>
										</div>
									</div>
									<div className='col-md-7'></div>
									<div className='col-12 d-flex justify-content-end'>
										<button
											className='btn btn-primary form-control'
											onClick={(e) => updateHandler(e)}
										>
											Edit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserProfile
