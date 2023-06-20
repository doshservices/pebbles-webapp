import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Country, State } from 'country-state-city'
import { user_update } from '../../features/authentication/authenticationSlice'
import { FaCheckCircle } from 'react-icons/fa'

const UserProfile = () => {
	const dispatch = useAppDispatch()
	const { user_detail, isLoading } = useAppSelector((state) => state.auth)

	const [lastName, setLastName] = useState(
		user_detail ? user_detail.lastName : ''
	)
	const [firstName, setFirstName] = useState(
		user_detail ? user_detail.firstName : ''
	)
	const [businessName, setBusinessName] = useState<string | undefined | null>(
		user_detail ? user_detail?.businessName : null
	)
	const [email, setEmail] = useState(user_detail ? user_detail.email : '')
	const [phoneNumber, setPhoneNumber] = useState(
		user_detail ? user_detail.phoneNumber : ''
	)
	const [address, setAddress] = useState(
		user_detail ? user_detail.companyAddress : ''
	)
	const [businessAddress, setBusinessAddress] = useState(
		user_detail ? user_detail.companyAddress : ''
	)
	const [state, setState] = useState(user_detail ? user_detail.state : '')
	const [city, setCity] = useState(user_detail ? user_detail.city : '')
	const [country, setCountry] = useState(
		user_detail ? user_detail.country : 'NG'
	)

	const [imageFile, setImageFile] = useState('')
	const [idFile, setIdFile] = useState('')
	const [cacFile, setCacFile] = useState('')
	const [imageFormat, setImageFormat] = useState('')
	const [idFormat, setIdFormat] = useState('')
	const [cacFormat, setCacFormat] = useState('')
	const [mainImage, setMainImage] = useState<string | Blob>('')
	const [mainId, setMainId] = useState<string | Blob>('')
	const [mainCac, setMainCac] = useState<string | Blob>('')
	const [uploadedImage, setUploadedImage] = useState(
		user_detail ? user_detail.profilePicture : ''
	)
	const [uploadedId, setUploadedId] = useState(
		user_detail ? user_detail.validId : ''
	)
	const [uploadedCac, setUploadedCac] = useState(
		user_detail ? user_detail.cacDocument : ''
	)
	const [uploading, setUploading] = useState(false)

	const getBase64 = (file: any) => {
		return new Promise((resolve) => {
			let baseURL: string | ArrayBuffer | null = ''
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				// Make a fileInfo Object
				baseURL = reader?.result
				resolve(baseURL)
			}
		})
	}

	const handleFileInputChange = (e: any, text: string) => {
		let file = e.target.files[0]

		if (text === 'image') setMainImage(file)
		else if (text === 'id') setMainId(file)
		else setMainCac(file)

		getBase64(file)
			.then((result) => {
				file['base64'] = result
				let split = file.base64.split(',')

				if (text === 'image') {
					setImageFile(split[1])
					let type = file.type.split('/')
					setImageFormat(type[1])
				} else if (text === 'id') {
					setIdFile(split[1])
					let type = file.type.split('/')
					setIdFormat(type[1])
				} else {
					setCacFile(split[1])
					let type = file.type.split('/')
					setCacFormat(type[1])
				}
			})
			.catch((err) => {})
	}

	const uploadFileHandler = () => {
		const formData = new FormData()
		formData.append('file', mainImage)
		formData.append('image', mainImage)
		formData.append('upload_preset', 'pebbles')
		formData.append('cloud_name', 'pebbles-signature')

		setUploading(true)

		fetch('https://api.cloudinary.com/v1_1/pebbles-signature/image/upload', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setUploading(false)
				setMainImage('')
				setUploadedImage(data.secure_url)
				setImageFile('')
			})
			.catch((err) => {
				setUploading(false)
				setMainImage('')
				setImageFile('')
			})
	}

	const uploadIdHandler = () => {
		const formData = new FormData()
		formData.append('file', mainId)
		formData.append('image', mainId)
		formData.append('upload_preset', 'pebbles')
		formData.append('cloud_name', 'pebbles-signature')

		setUploading(true)

		fetch('https://api.cloudinary.com/v1_1/pebbles-signature/image/upload', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setUploading(false)
				setMainId('')
				setUploadedId(data.url)
				setIdFile('')
			})
			.catch((err) => {
				setUploading(false)
				setMainId('')
				setIdFile('')
			})
	}

	const uploadCacHandler = () => {
		const formData = new FormData()
		formData.append('file', mainCac)
		formData.append('image', mainCac)
		formData.append('upload_preset', 'pebbles')
		formData.append('cloud_name', 'pebbles-signature')

		setUploading(true)

		fetch('https://api.cloudinary.com/v1_1/pebbles-signature/image/upload', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setUploading(false)
				setMainCac('')
				setUploadedCac(data.url)
				setCacFile('')
			})
			.catch((err) => {
				setUploading(false)
				setMainCac('')
				setCacFile('')
			})
	}

	const updateHandler = (e: any) => {
		e.preventDefault()
		if (user_detail?.role === 'BUSINESS') {
			let data = {
				firstName,
				lastName,
				businessName,
				companyAddress: businessAddress,
				phoneNumber,
				state,
				country,
				city,
				profilePicture: uploadedImage,
				validId: uploadedId,
				cacDocument: uploadedCac,
			}
			dispatch(user_update(data))
		} else {
			let data = {
				firstName,
				lastName,
				companyAddress: address,
				phoneNumber,
				state,
				country,
				city,
				profilePicture: uploadedImage,
				validId: uploadedId,
			}
			dispatch(user_update(data))
		}
	}

	return (
		<main className='dashboard'>
			<h5> My Account </h5>
			<div className='row justify-content-center'>
				<div className='col-lg-9 col-11 bg-white p-4'>
					<h6 className='mb-4'> Profile </h6>
					<div className='dashboard_pad'>
						<div className='d-flex' style={{}}>
							{user_detail?.profilePicture && (
								<img
									src={user_detail?.profilePicture}
									alt=''
									style={{
										width: '6rem',
										height: '6rem',
										borderRadius: '50%',
										objectFit: 'cover',
										objectPosition: 'center',
									}}
								/>
							)}
						</div>
						<div
							className='pebbles_form pb-5 mb-2'
							style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
						>
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-md-6'>
										<label htmlFor=''>First Name</label>
										<input
											type='text'
											value={firstName}
											placeholder='Enter First name here'
											className='form-control'
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
									<div className='col-md-6'>
										<label htmlFor=''>Last Name</label>
										<input
											type='text'
											value={lastName}
											placeholder='Enter First name here'
											className='form-control'
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
									<div className='col-md-12'>
										<label htmlFor=''>Email</label>
										<input
											type='text'
											value={email}
											disabled
											// placeholder='Enter First name here'
											className='form-control'
											// onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
									{user_detail?.role === 'BUSINESS' &&
										user_detail?.businessName && (
											<div className='col-md-12'>
												<label htmlFor=''>Business Name</label>
												<input
													type='text'
													value={businessName ? businessName : ''}
													placeholder='Enter Company name here'
													className='form-control'
													onChange={(e) => setBusinessName(e.target.value)}
												/>
											</div>
										)}

									{user_detail?.role === 'BUSINESS' ? (
										<div className='col-md-6'>
											<label htmlFor='address'>Business Address</label>
											<input
												type='text'
												placeholder='Enter Address here'
												value={businessAddress}
												className='form-control'
												onChange={(e) => setBusinessAddress(e.target.value)}
											/>
										</div>
									) : (
										<div className='col-md-6'>
											<label htmlFor='address'> Address</label>
											<input
												type='text'
												placeholder='Enter Address here'
												value={address}
												className='form-control'
												onChange={(e) => setAddress(e.target.value)}
											/>
										</div>
									)}
									<div className='col-md-6'>
										<label htmlFor='city'> City </label>
										<input
											type='text'
											placeholder='Enter City here'
											value={city}
											className='form-control'
											onChange={(e) => setCity(e.target.value)}
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
											value={state}
											defaultValue={state}
										>
											<option value=''>Select State</option>
											{State.getStatesOfCountry(country).map((item, index) => (
												<option value={item.name} key={index}>
													{item.name}
												</option>
											))}
										</select>
									</div>

									<div
										className={
											user_detail?.role === 'BUSINESS'
												? 'col-md-4 col-sm-6'
												: 'col-md-6 col-sm-6'
										}
									>
										<div className='facilities__images'>
											<label className='facilities__images-text'>
												Profile Picture{' '}
												<span>
													{' '}
													{user_detail?.profilePicture && (
														<FaCheckCircle
															color='#155eef'
															size={12}
															className='ms-1'
														/>
													)}{' '}
												</span>
											</label>

											<input
												type='file'
												className='form-control'
												// onChange={(e) => setImage(e.target.files[0])}
												onChange={(e) => handleFileInputChange(e, 'image')}
												style={{ borderBottom: 'none' }}
											/>
											{imageFile && (
												<div className='col-md-12'>
													<div className='mt-2'>
														<button
															className='btn btn-primary'
															onClick={uploadFileHandler}
															disabled={uploading ? true : false}
														>
															Upload Image{' '}
															{uploading && (
																<i className='fas fa-spinner fa-spin'></i>
															)}
														</button>
													</div>
												</div>
											)}

											<input
												type='text'
												value={uploadedImage}
												onChange={(e) => setUploadedImage(e.target.value)}
												className='site-form mb-3 d-none'
											/>
										</div>
									</div>
									<div
										className={
											user_detail?.role === 'BUSINESS'
												? 'col-md-4 col-sm-6'
												: 'col-md-6 col-sm-6'
										}
									>
										<div className='facilities__images'>
											<label className='facilities__images-text'>
												Valid ID{' '}
												<span>
													{' '}
													{user_detail?.validId && (
														<FaCheckCircle
															color='#155eef'
															size={12}
															className='ms-1'
														/>
													)}{' '}
												</span>
											</label>

											<input
												type='file'
												className='form-control'
												onChange={(e) => handleFileInputChange(e, 'id')}
												style={{ borderBottom: 'none' }}
											/>
											{idFile && (
												<div className='col-md-12'>
													<div className='mt-2'>
														<button
															className='btn btn-primary'
															onClick={uploadIdHandler}
															disabled={uploading ? true : false}
														>
															Upload Image{' '}
															{uploading && (
																<i className='fas fa-spinner fa-spin'></i>
															)}
														</button>
													</div>
												</div>
											)}
											<input
												type='text'
												value={uploadedId}
												onChange={(e) => setUploadedId(e.target.value)}
												className='site-form mb-3 d-none'
											/>
										</div>
									</div>

									{user_detail?.role === 'BUSINESS' && (
										<div className='col-md-4 col-sm-6'>
											<div className='facilities__images'>
												<label className='facilities__images-text'>
													CAC Document{' '}
													<span>
														{' '}
														{user_detail?.cacDocument && (
															<FaCheckCircle
																color='#155eef'
																size={12}
																className='ms-1'
															/>
														)}{' '}
													</span>
												</label>

												<input
													type='file'
													className='form-control'
													onChange={(e) => handleFileInputChange(e, 'cac')}
													style={{ borderBottom: 'none' }}
												/>
												{cacFile && (
													<div className='col-md-12'>
														<div className='mt-2'>
															<button
																className='btn btn-primary'
																onClick={uploadCacHandler}
																disabled={uploading ? true : false}
															>
																Upload Image{' '}
																{uploading && (
																	<i className='fas fa-spinner fa-spin'></i>
																)}
															</button>
														</div>
													</div>
												)}
												<input
													type='text'
													value={uploadedCac}
													onChange={(e) => setUploadedCac(e.target.value)}
													className='site-form mb-3 d-none'
												/>
											</div>
										</div>
									)}

									<div className='col-12 d-flex justify-content-end'>
										<button
											className='btn btn-primary form-control'
											onClick={(e) => updateHandler(e)}
											disabled={isLoading}
										>
											{isLoading ? (
												<i className='fas fa-spinner fa-spin'></i>
											) : (
												'Update'
											)}
										</button>
									</div>
								</div>
							</form>
						</div>

						{/* <div
							className='pebbles_form pb-5 mb-3'
							style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
						>
							<h5 className='pt-4'>Reset Password</h5>
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-md-6'>
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
									<div className='col-md-6'></div>
									<div className='col-md-6'>
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
									<div className='col-md-6'></div>
									<div className='col-md-6'>
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
									<div className='col-md-6'></div>
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
						</div> */}
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserProfile
