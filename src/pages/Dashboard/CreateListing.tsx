import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import GoogleMapReact from 'google-map-react'
import { Country, State } from 'country-state-city'
import blue_building from '../../assets/blue_building.png'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { MultiSelect } from 'react-multi-select-component'
import {
	create_apartment,
	get_apartment_by_id,
	update_apartment,
} from '../../features/apartment/apartmentSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loader from '../../components/Loader'

const CreateListing = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const { user_detail } = useAppSelector((state) => state.auth)
	const { isFetchingApartment, createSuccess, apartment, isCreatingApartment } =
		useAppSelector((state) => state.apartment)

	const [apartmentName, setApartmentName] = useState<string>('')
	const [address, setAddress] = useState<string>('')
	const [apartmentCountry, setApartmentCountry] = useState<string>('NG')
	const [apartmentState, setApartmentState] = useState<string>('')
	const [price, setPrice] = useState<any>()
	const [typeOfApartment, setTypeOfApartment] = useState<string>('')
	const [facilities, setFacilities] = useState<any[]>([])
	const [apartmentInfo, setApartmentInfo] = useState<string>('')
	const [numberOfBedrooms, setNumberOfBedrooms] = useState<string>('')
	const [numberOfToilets, setNumberOfToilets] = useState<string>('')
	const [numberOfGuests, setNumberOfGuests] = useState<string>('')
	const [lat, setLat] = useState<number>()
	const [lng, setLng] = useState<number>()
	const [landmark_image_values, setLandmark_image_values] = useState<any[]>([])
	const [imageIndex, setImageIndex] = useState<number>()

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
	const [mainLandmarkImage, setMainLandmarkImage] = useState<string | Blob>('')
	const [uploadedFeaturedImage, setUploadedFeaturedImage] = useState('')
	const [uploadedImage, setUploadedImage] = useState('')
	const [uploadedLandmarkImage, setUploadedLandmarkImage] = useState('')
	const [featuredImageList, setFeaturedImageList] = React.useState<string[]>([])
	const [imageList, setImageList] = React.useState<string[]>([])
	const [uploading, setUploading] = useState(false)
	const [fileLength, setFileLength] = React.useState('')

	const [inputFields, setInputFields] = useState([
		{ landmark: '', address: '', details: '', image: '' },
	])

	const handleFormChange = async (event: any, index: number, type: string) => {
		let data = [...inputFields]
		if (type === 'string') {
			data[index][event.target.name] = event.target.value
			setInputFields(data)
		} else {
			await handleLandmarkFileInputChange(event, index)
			if (
				landmark_image_values?.findIndex((item) => index === item.index) !== -1
			) {
				data[index][event.target.name] = landmark_image_values?.find(
					(item) => index === item.index
				).text
				setInputFields(data)
			}
		}
	}

	const addNewFields = (e) => {
		e.preventDefault()
		let newfield = { landmark: '', address: '', details: '', image: '' }

		setInputFields([...inputFields, newfield])
	}

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
		{ label: 'Wi-Fi', value: 'Wi-Fi' },
		{
			label: 'Television- Netflix, dstv, Hulu, Amazon etc',
			value: 'Television- Netflix, dstv, Hulu, Amazon etc',
		},
		{
			label:
				'Kitchen with appliances such as refrigerator, stove, oven, and microwave',
			value:
				'Kitchen with appliances such as refrigerator, stove, oven, and microwave',
		},
		{ label: 'Washer and dryer', value: 'Washer and dryer' },
		{
			label: 'Heating and air conditioning',
			value: 'Heating and air conditioning',
		},
		{
			label: 'Parking (garage or covered)',
			value: 'Parking (garage or covered)',
		},
		{ label: 'Elevator', value: 'Elevator' },
		{ label: 'Gym or fitness center', value: 'Gym or fitness center' },
		{ label: 'Swimming pool', value: 'Swimming pool' },
		{ label: 'Hot tub', value: 'Hot tub' },
		{ label: 'Business center', value: 'Business center' },
		{ label: 'Conference room', value: 'Conference room' },
		{ label: 'Clubhouse', value: 'Clubhouse' },
		{ label: 'Controlled access', value: 'Controlled access' },
		{ label: 'Pet-friendly', value: 'Pet-friendly' },
		{ label: 'Balcony or patio', value: 'Balcony or patio' },
		{ label: 'Storage space', value: 'Storage space' },
		{ label: 'Smoke-free', value: 'Smoke-free' },
		{ label: 'On-site maintenance', value: 'On-site maintenance' },
		{ label: 'On-site management', value: 'On-site management' },
		{ label: '24/7 CCTV Surveillance', value: '24/7 CCTV Surveillance' },
		{
			label: 'Close to shops, restaurants, and entertainment',
			value: 'Close to shops, restaurants, and entertainment',
		},
		{
			label: 'Furnished options available',
			value: 'Furnished options available',
		},
		{
			label: 'Short-term leases available',
			value: 'Short-term leases available',
		},
		{
			label: 'Long-term leases available',
			value: 'Long-term leases available',
		},
	]

	const deleteMainFeaturedImage = () => {
		setMainFeaturedImage([])
	}

	const deleteMainImage = () => {
		setMainImage([])
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

	const handleFileInputChange = async (e: any, text: string) => {
		let file = e.target.files
		setFileLength(file.length)

		if (text === 'f_image') {
			mainFeaturedImage.push(...file)
		} else mainImage.push(...file)

		for (let i = 0; i < file.length; i++) {
			getBase64(file[i])
				.then((result) => {
					file[i]['base64'] = result
					let split = file[i].base64.split(',')
					if (text === 'f_image') {
						setFeaturedImageFile(split[1])
						let type = file[i].type.split('/')
						setFeaturedImageFormat(type[1])
					} else {
						setImageFile(split[1])
						let type = file[i].type.split('/')
						setImageFormat(type[1])
					}
				})
				.catch((err) => {})
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
						setUploadedImage(data.secure_url)
						imageList.push(data.secure_url)
						setImageFile('')
					})
					.catch((err) => {
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
						setUploadedFeaturedImage(data.secure_url)
						featuredImageList.push(data.secure_url)
						setFeaturedImageFile('')
					})
					.catch((err) => {
						setUploading(false)
						// setMainImage(null)
						setFeaturedImageFile('')
					})
			})
		} else {
			alert('You can only select and upload 3 images.')
		}
	}

	const handleLandmarkFileInputChange = (e: any, index: number) => {
		let file = e.target.files[0]
		setMainLandmarkImage(file)
		setImageIndex(index)

		getBase64(file)
			.then((result) => {
				file['base64'] = result
				let split = file.base64.split(',')

				setLandmarkImageFile(split[1])
				let type = file.type.split('/')
				setLandmarkImageFormat(type[1])
			})
			.catch((err) => {})
	}

	const uploadLandmarkFileHandler = (e: any) => {
		e.preventDefault()
		const data = new FormData()

		data.append('file', mainLandmarkImage)
		data.append('image', mainLandmarkImage)
		data.append('upload_preset', 'pebbles')
		data.append('cloud_name', 'pebbles-signature')

		setUploading(true)

		fetch('https://api.cloudinary.com/v1_1/pebbles-signature/image/upload', {
			method: 'post',
			body: data,
		})
			.then((resp) => resp.json())
			.then((data) => {
				setUploading(false)
				setUploadedLandmarkImage(data.secure_url)
				// setLandmarkImageList(data.secure_url)
				setLandmark_image_values([
					...landmark_image_values,
					{ text: data.secure_url, index: imageIndex },
				])
				setLandmarkImageFile('')
			})
			.catch((err) => {
				setUploading(false)
				setLandmarkImageFile('')
			})
	}

	const createHandler = async (e: any, string: string) => {
		e.preventDefault()
		let data = {
			apartmentName,
			address,
			apartmentCountry,
			apartmentState,
			price: Number(price),
			typeOfApartment,
			facilities: facilities.map((item) => item.value),
			featuredImages: featuredImageList,
			apartmentImages: imageList,
			apartmentInfo,
			numberOfBedrooms: Number(numberOfBedrooms),
			numberOfToilets: Number(numberOfToilets),
			numberOfGuests: Number(numberOfGuests),
			longitude: String(lng),
			latitude: String(lat),
			landmark: inputFields,
		}

		if (
			numberOfBedrooms &&
			numberOfToilets &&
			numberOfGuests &&
			lng &&
			lat &&
			apartmentName &&
			address &&
			apartmentCountry &&
			apartmentState &&
			price &&
			typeOfApartment &&
			facilities?.length > 0 &&
			featuredImageList?.length > 0 &&
			imageList?.length > 0 &&
			apartmentInfo
		) {
			if (user_detail?.isVerified && user_detail?.validId) {
				if (string === 'create') {
					await dispatch(create_apartment(data))

					if (createSuccess) {
						toast.success('Apartment listed successfully')
						setTimeout(() => {
							navigate('/user/dashboard/listings')

							setApartmentName('')
							setAddress('')
							setApartmentCountry('NG')
							setApartmentState('')
							setPrice(0)
							setTypeOfApartment('')
							setFacilities([])
							setApartmentInfo('')
							setNumberOfBedrooms('')
							setNumberOfToilets('')
							setNumberOfGuests('')
							setLandmark_image_values([])
							setFeaturedImageFile('')
							setImageFile('')
							setLandmarkImageFile('')
							setMainFeaturedImage([])
							setMainImage([])
							setMainLandmarkImage('')
						}, 100)
					}
				} else {
					await dispatch(update_apartment({ ...data, id: params?.id }))
				}
			} else {
				toast.error(
					'Please update your profile before proceeding to list an apartment.'
				)
			}
		} else {
			toast.error('Please fill all required fields.')
		}
	}

	useEffect(() => {
		let data = [...inputFields]
		if (landmark_image_values?.length > 0) {
			for (let i = 0; i < landmark_image_values?.length; i++) {
				data[i]['image'] =
					landmark_image_values &&
					landmark_image_values?.find((item) => i === item.index).text
			}
		}
	}, [
		landmark_image_values,
		landmark_image_values?.length,
		inputFields,
		inputFields?.length,
	])

	useEffect(() => {
		if (!user_detail?.isVerified || !user_detail?.validId) {
			toast('Please update your profile before listing an apartment.')
		}
	}, [user_detail?.isVerified, user_detail?.validId])

	useEffect(() => {
		if (!apartment || apartment?.apartment?._id !== params?.id) {
			if (params?.id) {
				dispatch(get_apartment_by_id({ id: params?.id }))
			}
		} else {
			setApartmentName(apartment ? apartment?.apartment?.apartmentName : '')
			setAddress(apartment ? apartment?.apartment?.address : '')
			setApartmentCountry(
				apartment ? (apartment?.apartment?.apartmentCountry).toUpperCase() : ''
			)
			setImageList(apartment ? apartment?.apartment?.apartmentImages : [])
			setApartmentInfo(apartment ? apartment?.apartment?.apartmentInfo : '')
			setApartmentState(apartment ? apartment?.apartment?.apartmentState : '')
			setFacilities(
				apartment
					? apartment?.apartment?.facilities.map((item) => {
							return { label: item, value: item }
					  })
					: []
			)
			setFeaturedImageList(
				apartment ? apartment?.apartment?.featuredImages : []
			)
			setLat(apartment ? Number(apartment?.apartment?.latitude) : 0)
			setLng(apartment ? Number(apartment?.apartment?.longitude) : 0)
			setNumberOfBedrooms(
				apartment ? String(apartment?.apartment?.numberOfBedrooms) : ''
			)
			setNumberOfGuests(
				apartment ? String(apartment?.apartment?.numberOfGuests) : ''
			)
			setNumberOfToilets(
				apartment ? String(apartment?.apartment?.numberOfToilets) : ''
			)
			setPrice(apartment ? apartment?.apartment?.price : '')
			setTypeOfApartment(apartment ? apartment?.apartment?.typeOfApartment : '')
			setInputFields(
				apartment
					? apartment?.apartment?.landmark
					: [{ landmark: '', address: '', details: '', image: '' }]
			)
		}
	}, [params?.id, dispatch, apartment?.apartment?._id])

	return (
		<main className='dashboard'>
			<div className='row justify-content-center'>
				<div className='col-lg-10 col-11'>
					<div className='listing_form mb-2'>
						{isFetchingApartment ? (
							<Loader />
						) : (
							<form autoComplete='off'>
								<div className='row'>
									<div className='col-12'>
										<h5 className='d-flex' style={{ alignItems: 'center' }}>
											Basic Information
											<span className='span_important'> ! </span>
										</h5>
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
															required
															onChange={(e) => setApartmentName(e.target.value)}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Apartment Type </label>

													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<select
															required
															value={typeOfApartment}
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
															<option value='Semi-Detached'>
																Semi-Detached
															</option>
															<option value='Cottage/Farmhouse/Ranch'>
																Cottage/Farmhouse/Ranch
															</option>
															<option value='Party house/Pad'>
																Party house/Pad
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
										<h5 className='d-flex' style={{ alignItems: 'center' }}>
											Location/Contact
											<span className='span_important'> ! </span>
										</h5>
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
															required
															className='form-control'
															onChange={(e) => setAddress(e.target.value)}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Country </label>

													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<select
															className='form-select'
															required
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
												<div className='col-md-6'>
													<label htmlFor='city'> State </label>

													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<select
															className='form-select'
															required
															onChange={(e) =>
																setApartmentState(e.target.value)
															}
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
												<div className='col-md-6'>
													<label htmlFor='city'>
														{' '}
														Longitude (Select position on the map){' '}
													</label>

													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<input
															type='text'
															required
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
															required
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
										<h5 className='d-flex' style={{ alignItems: 'center' }}>
											Media
											<span className='span_important'> ! </span>
										</h5>
									</div>
									<div className='row justify-content-center'>
										<div className='col-11'>
											<div className='row'>
												<div className='col-md-6 col-sm-12 mb-3'>
													<div className='facilities__images listing_form'>
														<label className='facilities__images-text'>
															Featured Images (Please select 3 images)
														</label>

														<input
															type='file'
															multiple
															required
															className='form-control'
															// onChange={(e) => setImage(e.target.files[0])}
															onChange={(e) =>
																handleFileInputChange(e, 'f_image')
															}
															style={{ borderBottom: 'none' }}
														/>
														{mainFeaturedImage?.length > 0 && (
															<p
																onClick={deleteMainFeaturedImage}
																className='mt-2'
																style={{
																	fontSize: '11.5px',
																	textDecoration: 'underline',
																}}
															>
																<i
																	className='fa fa-trash'
																	style={{ color: 'red' }}
																></i>{' '}
																Clear all selected images{' '}
															</p>
														)}
														{featuredImageFile && (
															<div className='col-md-12'>
																<div className='mt-1'>
																	<button
																		className='btn btn-primary'
																		onClick={(e) =>
																			uploadFeaturedFileHandler(e)
																		}
																		disabled={uploading ? true : false}
																	>
																		Upload Images{' '}
																		{uploading && (
																			<i className='fas fa-spinner fa-spin'></i>
																		)}
																	</button>
																</div>
															</div>
														)}

														<input
															type='text'
															value={uploadedFeaturedImage}
															onChange={(e) =>
																setUploadedFeaturedImage(e.target.value)
															}
															className='site-form mb-3 d-none'
														/>
													</div>
												</div>
												<div className='col-md-6 col-sm-12'>
													<div className='facilities__images'>
														<label className='facilities__images-text'>
															Other Images (Please select a maximum of 12)
														</label>

														<input
															type='file'
															multiple
															required
															className='form-control'
															// onChange={(e) => setImage(e.target.files[0])}
															onChange={(e) =>
																handleFileInputChange(e, 'image')
															}
															style={{ borderBottom: 'none' }}
														/>
														{mainImage?.length > 0 && (
															<p
																onClick={deleteMainImage}
																className='mt-2'
																style={{
																	fontSize: '11.5px',
																	textDecoration: 'underline',
																}}
															>
																<i
																	className='fa fa-trash'
																	style={{ color: 'red' }}
																></i>{' '}
																Clear all selected images{' '}
															</p>
														)}
														{imageFile && (
															<div className='col-md-12'>
																<div className='mt-1'>
																	<button
																		className='btn btn-primary'
																		onClick={uploadFileHandler}
																		disabled={uploading ? true : false}
																	>
																		Upload Images{' '}
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
										<h5 className='d-flex' style={{ alignItems: 'center' }}>
											Apartment Details
											<span className='span_important'> ! </span>
										</h5>
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
															value={facilities}
															onChange={setFacilities}
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
															required
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
															required
															className='form-control'
															onChange={(e) =>
																setNumberOfGuests(e.target.value)
															}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Number Of Bedrooms </label>
													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<input
															type='number'
															placeholder='3'
															value={numberOfBedrooms}
															required
															className='form-control'
															onChange={(e) =>
																setNumberOfBedrooms(e.target.value)
															}
														/>
													</div>
												</div>
												<div className='col-md-6'>
													<label htmlFor='city'> Number Of Toilets </label>
													<div className='d-flex input_div'>
														<img src={blue_building} alt='' />
														<input
															type='number'
															required
															placeholder='3'
															value={numberOfToilets}
															className='form-control'
															onChange={(e) =>
																setNumberOfToilets(e.target.value)
															}
														/>
													</div>
												</div>
												<div className='col-md-12'>
													<label htmlFor='city'> Apartment Details </label>
													<textarea
														// placeholder='Brief Description'
														className='form-control'
														required
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
											{inputFields?.map((input, index) => (
												<div
													key={index}
													className='row mb-3 pb-4'
													style={{ borderBottom: '1px solid #ddd' }}
												>
													<div className='col-md-6'>
														<label htmlFor='city'> Landmark </label>
														<div className='d-flex input_div'>
															<img src={blue_building} alt='' />
															<input
																type='text'
																className='form-control'
																name='landmark'
																value={input.landmark}
																onChange={(event) =>
																	handleFormChange(event, index, 'string')
																}
															/>
														</div>
													</div>
													<div className='col-md-6'>
														<label htmlFor='city'> Address </label>
														<div className='d-flex input_div'>
															<img src={blue_building} alt='' />
															<input
																type='text'
																name='address'
																className='form-control'
																value={input.address}
																onChange={(event) =>
																	handleFormChange(event, index, 'string')
																}
															/>
														</div>
													</div>
													<div className='col-md-6'>
														<label htmlFor='city'> Details </label>
														<textarea
															// placeholder='Brief Description'
															name='details'
															className='form-control'
															value={input.details}
															onChange={(event) =>
																handleFormChange(event, index, 'string')
															}
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
																name='image'
																// onChange={(e) => setImage(e.target.files[0])}
																onChange={(event) =>
																	handleFormChange(event, index, 'file')
																}
																style={{ borderBottom: 'none' }}
															/>
															{landmarkImageFile && imageIndex === index && (
																<div className='col-md-12'>
																	<div className='mt-2'>
																		<button
																			className='btn btn-primary'
																			onClick={uploadLandmarkFileHandler}
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
																onChange={(e) =>
																	setUploadedImage(e.target.value)
																}
																className='site-form mb-3 d-none'
															/>
														</div>
													</div>
												</div>
											))}
											<div className='text-end mt-4'>
												<button
													onClick={(e) => addNewFields(e)}
													className='btn btn-primary'
													style={{
														backgroundColor: '#fff',
														color: '#155eef',
													}}
												>
													Add Landmark{' '}
													<FaPlus size={12} className='ms-2 mb-1' />
												</button>
											</div>
										</div>
									</div>

									<div className='col-12 mt-5'>
										<button
											onClick={(e) =>
												params?.id
													? createHandler(e, 'update')
													: createHandler(e, 'create')
											}
											className='btn btn-primary form-control'
											style={{ width: '13rem' }}
											disabled={isFetchingApartment}
										>
											{params?.id ? 'Update Listing' : 'Upload Listing'}
											{isCreatingApartment && (
												<i className='fas fa-spinner fa-spin'></i>
											)}
										</button>
									</div>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}

export default CreateListing
