import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { change_user_type } from '../../features/authentication/authenticationSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserUpgrade = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { isLoading } = useAppSelector((state) => state.auth)

	const [cacFile, setCacFile] = useState<any>('')
	const [mainCac, setMainCac] = useState<string | Blob>('')
	const [uploadedCac, setUploadedCac] = useState<string>('')
	const [uploading, setUploading] = useState(false)
	const [cacFormat, setCacFormat] = useState('')

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

	const handleFileInputChange = (e: any) => {
		let file = e.target.files[0]

		setMainCac(file)

		getBase64(file)
			.then((result) => {
				file['base64'] = result
				let split = file.base64.split(',')

				setCacFile(split[1])
				let type = file.type.split('/')
				setCacFormat(type[1])
			})
			.catch((err) => {})
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

	const submitHandler = (e: any) => {
		e.preventDefault()
		if (uploadedCac !== '') {
			let data = {
				validId: uploadedCac,
			}
			dispatch(change_user_type(data))

			setTimeout(() => {
				navigate('/user/dashboard/home')
			}, 100)
		} else {
			toast.error('Please upload image before submission.')
		}
	}

	return (
		<main className='dashboard'>
			<div className='row justify-content-center'>
				<div className='col-lg-9 col-11'>
					<div className='dashboard_pad'>
						<p style={{ fontSize: '14px', fontWeight: '500' }}>
							Upgrade your Personal account today. Become an Individual host by
							providing us with the details below. An email will be sent after
							verifying your information confirming the update.
						</p>
						<div
							className='pebbles_form pb-5 mb-2'
							style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
						>
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-md-12 col-sm-12'>
										<div className='facilities__images'>
											<label className='facilities__images-text'>
												Any Valid Document (NIN, Driver's licence, etc)
											</label>

											<input
												type='file'
												className='form-control'
												onChange={(e) => handleFileInputChange(e)}
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

									<div className='col-12 d-flex justify-content-end'>
										<button
											className='btn btn-primary form-control'
											onClick={(e) => submitHandler(e)}
											disabled={isLoading}
										>
											{isLoading ? (
												<i className='fas fa-spinner fa-spin'></i>
											) : (
												'Submit'
											)}
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

export default UserUpgrade
