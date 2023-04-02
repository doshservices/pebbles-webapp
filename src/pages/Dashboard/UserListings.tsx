import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import GoogleMapReact from 'google-map-react'
import { Country, State } from 'country-state-city'
import blue_building from '../../assets/blue_building.png'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { MultiSelect } from 'react-multi-select-component'

const UserListings = () => {
	const dispatch = useAppDispatch()
	const { user_detail, isLoading } = useAppSelector((state) => state.auth)

	const [apartmentName, setApartmentName] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	const [apartmentCountry, setApartmentCountry] = useState<string>('NG')
	const [apartmentState, setApartmentState] = useState<string>('')
	const [price, setPrice] = useState<any>()
	const [typeOfApartment, setTypeOfApartment] = useState<string>('')
	const [facilities, setFacilities] = useState<any[]>([])
	const [apartmentAmenities, setApartmentAmenities] = useState<any[]>([])
	const [apartmentImages, setApartmentImages] = useState<string>('')
	const [apartmentInfo, setApartmentInfo] = useState<string>('')
	const [numberOfRooms, setNumberOfRooms] = useState<string>('')
	const [numberOfGuests, setNumberOfGuests] = useState<any | undefined>()
	const [city, setCity] = useState<string>('')
	const [lat, setLat] = useState<number>()
	const [lng, setLng] = useState<number>()
	const [formFields, setFormFields] = useState([0])

	const [featuredImageFile, setFeaturedImageFile] = useState('')
	const [imageFile, setImageFile] = useState('')
	const [landmarkImageFile, setLandmarkImageFile] = useState('')
	const [featuredImageFormat, setFeaturedImageFormat] = useState('')
	const [imageFormat, setImageFormat] = useState('')
	const [landmarkImageFormat, setLandmarkImageFormat] = useState('')
	const [mainFeaturedImage, setMainFeaturedImage] = useState<string[] | Blob[]>(
		[]
	)
	const [mainImage, setMainImage] = useState<string[] | Blob[]>([])
	const [mainLandmarkImage, setMainLandmarkImage] = useState<string[] | Blob[]>(
		[]
	)
	const [uploadedFeaturedImage, setUploadedFeaturedImage] = useState('')
	const [uploadedImage, setUploadedImage] = useState('')
	const [uploadedLandmarkImage, setUploadedLandmarkImage] = useState('')
	const [featuredImageList, setFeaturedImageList] = React.useState<string[]>([])
	const [imageList, setImageList] = React.useState<string[]>([])
	const [landmarkImageList, setLandmarkImageList] = React.useState<string[]>([])
	const [uploading, setUploading] = useState(false)
	const [fileLength, setFileLength] = React.useState('')

	const AnyReactComponent = ({
		text,
		lat,
		lng,
	}: {
		text: any
		lat: number
		lng: number
	}) => (
		<>
			<FaMapMarkerAlt size={28} color='red' />
			{/* <div>{text}</div> */}
		</>
	)

	const defaultProps = {
		center: {
			lat: 6.465422,
			lng: 3.406448,
		},
		zoom: 11,
	}

	const options = [
		{ label: 'Grapes 🍇', value: 'grapes' },
		{ label: 'Mango 🥭', value: 'mango' },
		{ label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
	]

	const addFields = (e: any) => {
		e.preventDefault()
		const data = [...formFields]
		data.push(formFields[formFields.length - 1] + 1)
		setFormFields(data)
	}

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
		let file = e.target.files
		setFileLength(file.length)

		if (text === 'f_image') setMainFeaturedImage(file)
		else if (text === 'landmark') setMainLandmarkImage(file)
		else setMainImage(file)

		for (let i = 0; i < file.length; i++) {
			getBase64(file[i])
				.then((result) => {
					file[i]['base64'] = result
					// console.log('File Is', file)
					let split = file[i].base64.split(',')
					if (text === 'f_mage') {
						setFeaturedImageFile(split[1])
						let type = file.type.split('/')
						setFeaturedImageFormat(type[1])
					} else if (text === 'landmark') {
						setLandmarkImageFile(split[1])
						let type = file.type.split('/')
						setLandmarkImageFormat(type[1])
					} else {
						setImageFile(split[1])
						let type = file[i].type.split('/')
						setImageFormat(type[1])
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const uploadFileHandler = (e: any) => {
		e.preventDefault()
		if (mainImage?.length > 0 && mainImage?.length < 12) {
			const data = new FormData()
			mainImage.map((main: any) => {
				data.append('file', main)
				// data.append('image', main)
				data.append('upload_preset', 'pebbles')
				data.append('cloud_name', 'pebbles-signature')

				setUploading(true)

				fetch(
					'https://api.cloudinary.com/v1_1/pebbles-signature/image/upload',
					{
						method: 'post',
						body: data,
					}
				)
					.then((resp) => resp.json())
					.then((data) => {
						setUploading(false)
						// setMainImage(null)
						setUploadedImage(data.url)
						imageList.push(data.url)
						console.log(imageList)
						setImageFile('')
					})
					.catch((err) => {
						console.log(err)
						setUploading(false)
						// setMainImage(null)
						setImageFile('')
					})
			})
		} else {
			alert('You can only select and upload a maximum of 12 images.')
		}
	}

	const uploadFeaturedFileHandler = (e: any) => {
		e.preventDefault()
		if (mainFeaturedImage?.length > 0 && mainFeaturedImage?.length <= 3) {
			const data = new FormData()
			mainFeaturedImage.map((main: any) => {
				data.append('file', main)
				// data.append('image', main)
				data.append('upload_preset', 'pebbles')
				data.append('cloud_name', 'pebbles-signature')

				setUploading(true)

				fetch(
					'https://api.cloudinary.com/v1_1/pebbles-signature/image/upload',
					{
						method: 'post',
						body: data,
					}
				)
					.then((resp) => resp.json())
					.then((data) => {
						setUploading(false)
						// setMainImage(null)
						setUploadedFeaturedImage(data.url)
						featuredImageList.push(data.url)
						console.log(featuredImageList)
						setFeaturedImageFile('')
					})
					.catch((err) => {
						console.log(err)
						setUploading(false)
						// setMainImage(null)
						setFeaturedImageFile('')
					})
			})
		} else {
			alert('You can only select and upload 3 images.')
		}
	}

	const uploadLandmarkFileHandler = (e: any) => {
		e.preventDefault()
		if (mainLandmarkImage?.length > 0 && mainLandmarkImage?.length <= 1) {
			const data = new FormData()
			mainLandmarkImage.map((main: any) => {
				data.append('file', main)
				// data.append('image', main)
				data.append('upload_preset', 'pebbles')
				data.append('cloud_name', 'pebbles-signature')

				setUploading(true)

				fetch(
					'https://api.cloudinary.com/v1_1/pebbles-signature/image/upload',
					{
						method: 'post',
						body: data,
					}
				)
					.then((resp) => resp.json())
					.then((data) => {
						setUploading(false)
						// setMainImage(null)
						setUploadedLandmarkImage(data.url)
						landmarkImageList.push(data.url)
						console.log(landmarkImageList)
						setLandmarkImageFile('')
					})
					.catch((err) => {
						console.log(err)
						setUploading(false)
						// setMainImage(null)
						setLandmarkImageFile('')
					})
			})
		} else {
			alert('You can only select and upload 1 image.')
		}
	}

	const updateHandler = (e: any) => {
		e.preventDefault()
		let data = {}
		// dispatch(user_update(data))
	}

	return (
		<main className='dashboard'>
			<div className='row justify-content-center'>
				<div className='col-lg-10 col-11'>
					<div className='listing_form mb-2'>
						<form autoComplete='off'>
							<div className='row'>
								<div className='col-12'>
									<h5>Basic Information</h5>
								</div>
								<div className='row justify-content-center'>
									<div className='col-11'>
										<div className='row'>
											<div className='col-md-6'>
												<label htmlFor='city'> Apartment Name </label>
												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='text'
														placeholder='Name of Apartment here'
														value={apartmentName}
														className='form-control'
														onChange={(e) => setApartmentName(e.target.value)}
													/>
												</div>
											</div>
											<div className='col-md-6'>
												<label htmlFor='city'> Apartment Type </label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<select
														onChange={(e) => {
															setTypeOfApartment(e.target.value)
														}}
														className='form-control form-select form-input'
													>
														<option value=''> Choose Apartment Type </option>
														<option value='BQ'>BQ</option>
														<option value='Studio'>Studio</option>
														<option value='1 Bedroom Flat'>
															1 Bedroom Flat
														</option>
														<option value='2 Bedrooms Flat'>
															2 Bedrooms Flat
														</option>
														<option value='3 Bedrooms Flat'>
															3 Bedrooms Flat
														</option>
														<option value='4 Bedrooms Flat'>
															4 Bedrooms Flat
														</option>
														<option value='5 Bedrooms Flat'>
															5 Bedrooms Flat
														</option>
														<option value='6 Bedrooms Flat'>
															6 Bedrooms Flat
														</option>
														<option value='7 Bedrooms Flat'>
															7 Bedrooms Flat
														</option>
														<option value='8 Bedrooms Flat'>
															8 Bedrooms Flat
														</option>
														<option value='9 Bedrooms Flat'>
															9 Bedrooms Flat
														</option>
														<option value='10 Bedrooms Flat'>
															10 Bedrooms Flat
														</option>

														<option value='Flat'>Flat</option>
														<option value='Hotel Boutique'>
															Hotel Boutique
														</option>
														<option value='Terrace'>Terrace</option>
														<option value='Bungalow'>Bungalow</option>
														<option value='Detached'>Detached</option>
														<option value='Semi-Detached'>Semi-Detached</option>
														<option value='Cottage/Farmhouse/Ranch'>
															Cottage/Farmhouse/Ranch
														</option>
														<option value='Villa/Mansions'>
															Villa/Mansions
														</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-12 mt-2'>
									<h5>Location/Contact</h5>
								</div>
								<div className='row justify-content-center'>
									<div className='col-11'>
										<div className='row'>
											<div className='col-md-12'>
												<label htmlFor='city'> Address </label>
												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='text'
														placeholder='Address of your Apartment'
														value={address}
														className='form-control'
														onChange={(e) => setAddress(e.target.value)}
													/>
												</div>
											</div>
											<div className='col-md-4'>
												<label htmlFor='city'> Country </label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<select
														className='form-select'
														value={apartmentCountry}
														defaultValue={apartmentCountry}
														onChange={(e) =>
															setApartmentCountry(e.target.value)
														}
													>
														<option value=''>Select Country</option>
														{Country.getAllCountries().map((item, index) => (
															<option value={item.isoCode} key={index}>
																{item.flag} {item.name}
															</option>
														))}
													</select>
												</div>
											</div>
											<div className='col-md-4'>
												<label htmlFor='city'> State </label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<select
														className='form-select'
														onChange={(e) => setApartmentState(e.target.value)}
														value={apartmentState}
														defaultValue={apartmentState}
													>
														<option value=''>Select State</option>
														{State.getStatesOfCountry(apartmentCountry).map(
															(item, index) => (
																<option value={item.name} key={index}>
																	{item.name}
																</option>
															)
														)}
													</select>
												</div>
											</div>
											<div className='col-md-4'>
												<label htmlFor='city'> City </label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='text'
														placeholder='Enter the city'
														value={city}
														className='form-control'
														onChange={(e) => setCity(e.target.value)}
													/>
												</div>
											</div>
											<div className='col-md-6'>
												<label htmlFor='city'>
													{' '}
													Longitude (Select position on the map){' '}
												</label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='text'
														placeholder='Longitude'
														value={lng}
														className='form-control'
														disabled
													/>
												</div>
											</div>
											<div className='col-md-6'>
												<label htmlFor='city'>
													{' '}
													Latitude (Select position on the map){' '}
												</label>

												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='text'
														placeholder='Latitude'
														value={lat}
														className='form-control'
														disabled
													/>
												</div>
											</div>
											<div className='col-12'>
												<div className='mapp'>
													<GoogleMapReact
														bootstrapURLKeys={{
															key: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
														}}
														defaultCenter={defaultProps.center}
														defaultZoom={defaultProps.zoom}
														onClick={(ev) => {
															setLat(ev.lat)
															setLng(ev.lng)
															console.log('latitide = ', ev.lat)
															console.log('longitude = ', ev.lng)
														}}
													>
														{lng && lat && (
															<AnyReactComponent
																lat={lat}
																lng={lng}
																text='My Marker'
															/>
														)}
														<AnyReactComponent
															lat={6.465422}
															lng={3.406448}
															text='My Marker'
														/>
													</GoogleMapReact>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-12 mt-2'>
									<h5>Media</h5>
								</div>
								<div className='row justify-content-center'>
									<div className='col-11'>
										<div className='row'>
											<div className='col-md-6'>
												<div className='facilities__images listing_form'>
													<label className='facilities__images-text'>
														Featured Images (Please select 3 images)
													</label>

													<input
														type='file'
														className='form-control'
														// onChange={(e) => setImage(e.target.files[0])}
														onChange={(e) =>
															handleFileInputChange(e, 'f_image')
														}
														style={{ borderBottom: 'none' }}
													/>
													{imageFile && (
														<div className='col-md-12'>
															<div className='mt-2'>
																<button
																	className='btn btn-primary'
																	onClick={(e) => uploadFeaturedFileHandler(e)}
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
											<div className='col-md-6'>
												<div className='facilities__images'>
													<label className='facilities__images-text'>
														Other Images (Please select a maximum of 12)
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
										</div>
									</div>
								</div>

								<div className='col-12 mt-4 pt-2'>
									<h5>Apartment Details</h5>
								</div>
								<div className='row justify-content-center'>
									<div className='col-11'>
										<div className='row'>
											<div className='col-md-12'>
												<label htmlFor='city'> Apartment Amenities </label>
												<div className='d-flex input_div'>
													<img
														src={blue_building}
														alt=''
														style={{ marginTop: '1rem' }}
													/>
													<MultiSelect
														options={options}
														value={apartmentAmenities}
														onChange={setApartmentAmenities}
														labelledBy='Select'
														className='form-control'
													/>
												</div>
											</div>
											<div className='col-md-6'>
												<label htmlFor='city'> Price </label>
												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='number'
														placeholder='Price'
														value={price}
														className='form-control'
														onChange={(e) => setPrice(e.target.value)}
													/>
												</div>
											</div>
											<div className='col-md-6'>
												<label htmlFor='city'> Max Guests </label>
												<div className='d-flex input_div'>
													<img src={blue_building} alt='' />
													<input
														type='number'
														placeholder='Max number of Guests'
														value={numberOfGuests}
														className='form-control'
														onChange={(e) => setNumberOfGuests(e.target.value)}
													/>
												</div>
											</div>
											<div className='col-md-12'>
												<label htmlFor='city'> Apartment Details </label>
												<textarea
													// placeholder='Brief Description'
													className='form-control'
													value={apartmentInfo}
													onChange={(e) => setApartmentInfo(e.target.value)}
												></textarea>
											</div>
										</div>
									</div>
								</div>

								<div className='col-12 mt-4 pt-2'>
									<h5> Landmark/Resturants </h5>
								</div>
								<div className='row justify-content-center'>
									<div className='col-11'>
										{formFields?.map((form, index) => (
											<div
												className='row mb-3 pb-4'
												style={{ borderBottom: '1px solid #ddd' }}
											>
												<div className='col-md-6'>
													<label htmlFor='city'> Landmark </label>
													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<input
															type='text'
															placeholder='Landmark close to this apartment'
															// value={price}
															className='form-control'
															// onChange={(e) => setPrice(e.target.value)}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Address </label>
													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<input
															type='text'
															placeholder='Landmark Address'
															// value={numberOfGuests}
															className='form-control'
															// onChange={(e) =>
															// 	setNumberOfGuests(e.target.value)
															// }
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Details </label>
													<textarea
														// placeholder='Brief Description'
														className='form-control'
													></textarea>
												</div>
												<div className='col-md-6'>
													<div className='facilities__images listing_form'>
														<label className='facilities__images-text'>
															Landmark Image (Please select only 1 image)
														</label>

														<input
															type='file'
															className='form-control'
															// onChange={(e) => setImage(e.target.files[0])}
															onChange={(e) =>
																handleFileInputChange(e, 'image')
															}
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
											</div>
										))}
										<div className='text-end mt-4'>
											<button
												onClick={(e) => addFields(e)}
												className='btn btn-primary'
												style={{
													backgroundColor: '#fff',
													color: '#155eef',
													// display: 'flex',
													// alignItems: 'center',
													// alignContent: 'center',
													// justifyContent: 'center',
												}}
											>
												Add Landmark <FaPlus size={12} className='ms-2 mb-1' />
											</button>
										</div>
									</div>
								</div>
								<div className='col-12 mt-5'>
									<button
										onClick={(e) => addFields(e)}
										className='btn btn-primary form-control'
										style={{ width: '13rem' }}
									>
										Upload Listing
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserListings
