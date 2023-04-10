import React, { useEffect, useLayoutEffect, useState } from 'react'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import bgImage from '../../assets/carouselBackground1.png'
import bgImage2 from '../../assets/Registration1.jpg'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { comma } from '../../utils/helper'
import { FaSnowflake } from 'react-icons/fa'
import {
	AiOutlineWifi,
	AiOutlineStop,
	AiOutlineClockCircle,
} from 'react-icons/ai'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePool, MdOutlinePayments } from 'react-icons/md'
import { SlScreenDesktop } from 'react-icons/sl'
import { CgGym } from 'react-icons/cg'
import { TbMessageReport, TbDisabled } from 'react-icons/tb'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import abuja from '../../assets/abuja.png'
import two_users from '../../assets/two_users.png'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import apartmentImg from '../../assets/picture.png'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_apartment_by_id } from '../../features/apartment/apartmentSlice'
import Loader from '../../components/Loader'
import axios from 'axios'
import { create_booking, reset } from '../../features/booking/bookingSlice'

const ApartmentDetails = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const { user_detail } = useAppSelector((state) => state.auth)
	const { allApartments, apartment, isFetchingApartment, nearbyApartments } =
		useAppSelector((state) => state.apartment)
	const { booking, isCreatingBooking } = useAppSelector(
		(state) => state.booking
	)

	const [limitValue, setLimitValue] = useState<number>(3)
	const [limit, setLimit] = useState<boolean>(false)
	const [photoIndex, setPhotoIndex] = useState<number>(0)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [checkInDate, setCheckInDate] = useState<string>('')
	const [checkOutDate, setCheckOutDate] = useState<string>('')
	const [numberOfGuests, setNumberOfGuests] = useState<string>('')

	const images = [bgImage, bgImage2]

	const amenities: string[] = [
		'24hrs Power Supply',
		'Air conditioning',
		'Fast Wi-Fi',
		'Swimming pool',
		'TV with Netflix, Amazon and Julu',
		'Fitness Gym',
	]

	const toggleMore = () => {
		setLimit(!limit)
		if (limit) {
			setLimitValue(amenities?.length - 1)
		} else {
			setLimitValue(3)
		}
	}

	const landmarks = [
		{
			image: abuja,
			name: 'Teslim Balogun Stadium',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Costain Plc',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Costain Plc',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Teslim Balogun Stadium',
			distance: '10',
		},
	]

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	console.log('apartment', apartment, 'booking', booking)

	const pressHandler = async (e: any, id: number) => {
		e.preventDefault()
		// setIsLoading(true)
		// await axios({
		// 	url: `${url}/apartments/is-available`,
		// 	method: "POST",
		// 	headers: authHeader(userDetail.token),
		// 	data: { apartmentId: id },
		// })
		// 	.then((res) => {
		// 		setAvailability(res?.data?.data?.message)
		// 		toast.success(res?.data?.data?.message, { position: "top-right" })
		// 		setIsLoading(false)
		// 	})
		// 	.catch((err) => {
		// 		console.log("error with fetching apartment availability", err)
		// 		setIsLoading(false)
		// 	})
		// setIsLoading(false)
	}

	const createBookingHandler = (e: any) => {
		if (user_detail) {
			e.preventDefault()
			let data = {
				apartmentOwnerId: apartment?.apartment?.userId,
				apartmentId: apartment?.apartment?._id,
				checkInDate,
				checkOutDate,
				bookingAmount: apartment?.apartment?.price,
				numberOfGuests: Number(numberOfGuests),
			}
			dispatch(create_booking(data))
		} else {
			alert('You must have an account before you can book an apartment.')
			setTimeout(() => {
				navigate('/auth/login')
			}, 1000)
		}
	}

	useEffect(() => {
		dispatch(get_apartment_by_id({ id: params?.id }))

		return () => {
			dispatch(reset())
		}
	}, [limitValue, limit, params?.id, dispatch])

	return (
		<main className='apartment_details_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>

			{isFetchingApartment ? (
				<Loader />
			) : apartment && apartment?.apartment ? (
				<div className='container'>
					<div style={{ position: 'relative' }}>
						<div className='row mb-4'>
							<div className='col-md-7'>
								<img
									src={apartment?.apartment?.featuredImages[0]}
									alt=''
									className='intro_image intro_full'
								/>
							</div>
							<div className='col-md-5'>
								<div style={{ marginBottom: '1.5rem' }}>
									<img
										src={apartment?.apartment?.featuredImages[1]}
										alt=''
										className='intro_image intro_half'
									/>
								</div>
								<div>
									<img
										src={apartment?.apartment?.featuredImages[2]}
										alt=''
										className='intro_image intro_half'
									/>
								</div>
							</div>
						</div>

						<button className='lightbox_btn' onClick={() => setIsOpen(true)}>
							VIEW 10 PHOTOS
						</button>
						{isOpen && (
							<Lightbox
								mainSrc={apartment?.apartment?.apartmentImages[photoIndex]}
								nextSrc={
									apartment?.apartment?.apartmentImages[
										(photoIndex + 1) %
											apartment?.apartment?.apartmentImages.length
									]
								}
								prevSrc={
									apartment?.apartment?.apartmentImages[
										(photoIndex +
											apartment?.apartment?.apartmentImages.length -
											1) %
											apartment?.apartment?.apartmentImages.length
									]
								}
								onCloseRequest={() => setIsOpen(false)}
								onMovePrevRequest={() =>
									setPhotoIndex(
										(photoIndex +
											apartment?.apartment?.apartmentImages.length -
											1) %
											apartment?.apartment?.apartmentImages.length
									)
								}
								onMoveNextRequest={() =>
									setPhotoIndex(
										(photoIndex + 1) %
											apartment?.apartment?.apartmentImages.length
									)
								}
								imagePadding={100}
							/>
						)}
					</div>

					<div>
						<div className='row'>
							<div className='col-md-7'>
								<div>
									<h3 className='intro_header'>
										{' '}
										{apartment?.apartment?.apartmentName}{' '}
									</h3>
									<p className='intro_para'>
										{apartment?.apartment?.apartmentInfo}
									</p>
								</div>

								<div
									style={{
										borderBottom: '1.14691px solid rgba(45, 45, 45, 0.2)',
										paddingBottom: '2rem',
									}}
								>
									<h2 className='sect_head'>HOUSE DETAILS</h2>
									<h5 className='mb-3'>Available Amenities</h5>

									<div className='d-flex' style={{ flexWrap: 'wrap' }}>
										{apartment?.apartment?.facilities.map((item, index) => (
											<span style={{ paddingRight: 3 }}>
												{item}
												{index === apartment?.apartment?.facilities.length - 1
													? '.'
													: ','}
											</span>
											// <div key={index}>
											// 	{index <= limitValue ? (
											// 		<div className='col-md-6 col-sm-6'>
											// 			<div className='d-flex amenities_div'>
											// 				{item === '24hrs Power Supply' ? (
											// 					<HiOutlineLightBulb size={22} />
											// 				) : item === 'Air conditioning' ? (
											// 					<FaSnowflake size={22} />
											// 				) : item === 'Fast Wi-Fi' ? (
											// 					<AiOutlineWifi size={22} />
											// 				) : item === 'Swimming pool' ? (
											// 					<MdOutlinePool size={22} />
											// 				) : item ===
											// 				  'TV with Netflix, Amazon and Julu' ? (
											// 					<SlScreenDesktop size={22} />
											// 				) : (
											// 					<CgGym size={24} />
											// 				)}
											// 				<p> {item} </p>
											// 			</div>
											// 		</div>
											// 	) : null}
											// </div>
										))}
									</div>

									{/* <button
										onClick={() => toggleMore()}
										className='btn btn-primary mt-3  btn_white_blue'
									>
										Show all 20 Amenities
									</button> */}
								</div>

								{/* <div
									style={{
										borderBottom: '1.14691px solid rgba(45, 45, 45, 0.2)',
										paddingBottom: '2rem',
									}}
								>
									<h5 className='pt-4 mb-0'>Neighbourhood</h5>
									<p className='intro_para mb-0'>
										Surulere is a residential and commercial Local Government
										Area located on the mainland of Lagos in Lagos State,
										Nigeria, with an area of 23 km2 (8.9 sq mi). The local
										government area is bordered by Yaba, Mushin and Ebute-Metta.
										It is home to the Lagos National Stadium (capacity 60,000)
										built in 1972 for the All-Africa Games. Surulere also houses
										the Teslim Balogun Stadium, a multi use Stadium used mainly
										for football matches with an over twenty four thousand
										sitting capacity. The main commercial streets in Surulere
										are Western Avenue, Adeniran Ogunsanya, Adelabu, Ogunalana
										drive and Aguda, various open markets are dispersed in
										different neighborhoods. Industrial establishments are
										predominantly located at Iponri, Coker and Iganmu.
									</p>
								</div> */}

								<div className='booking_policy'>
									<h5 className='pt-4 mb-4'> Booking Policies </h5>
									<div>
										<div className='row'>
											<div className='col-lg-6 col-md-12'>
												<div className='d-flex'>
													<div>
														<AiOutlineClockCircle />
													</div>
													<div className='detail_div'>
														<h6> Check-in is at 3:00pm </h6>
														<h6> Check-out is at 11:00pm </h6>
														<p className='intro_para'>
															You may request early check-in and/or late
															check-out after booking. Our team will do our best
															to accommodate any requests based on availability.
														</p>
													</div>
												</div>
											</div>
											<div className='col-lg-6 col-md-12'>
												<div className='d-flex'>
													<div>
														<AiOutlineStop />
													</div>
													<div className='detail_div'>
														<h6> House Rules </h6>

														<ul className='intro_para'>
															<li>No smoking (not even on balconies/patios)</li>
															<li>
																No pets (not even really cute ones) unless
																otherwise stated
															</li>
															<li> No parties (not even really quiet ones) </li>
														</ul>
													</div>
												</div>
											</div>
											<div className='col-lg-6 col-md-12'>
												<div className='d-flex'>
													<div>
														<TbMessageReport />
													</div>
													<div className='detail_div'>
														<h6> Note </h6>

														<ul className='intro_para'>
															<li> A mini fridge is available on request.</li>
															<li>
																No room service or on-site parking available.
															</li>
														</ul>
													</div>
												</div>
												<div className='d-flex'>
													<div>
														<TbDisabled />
													</div>
													<div className='detail_div'>
														<h6> Accessibity </h6>

														<ul className='intro_para'>
															<li> Wheelchair accessibility not available</li>
															<li>Elevators available</li>
														</ul>
													</div>
												</div>
											</div>
											<div className='col-lg-6 col-md-12'>
												<div className='d-flex'>
													<div>
														<TbMessageReport />
													</div>
													<div className='detail_div'>
														<h6> Refund Policy </h6>

														<p className='intro_para'>
															We offer flexible cancellations for all bookings.
															Select the Flex Rate to cancel your booking up to
															24hrs before check-in and receive a full refund.
															For longer stays that are paid monthly, we require
															at least 15 days notice to cancel or modify
															without fees.
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-lg-5 col-md-5'>
								<div className='apartment_formform_pad'>
									<div className='apartment_formform'>
										<div className='row'>
											<div className='col-12'>
												<div className='d-flex sect1'>
													<img src={two_users} alt='' />
													<div>
														<p style={{ fontWeight: '600', fontSize: '14px' }}>
															Sleeps up to{' '}
															{apartment?.apartment?.numberOfGuests}
														</p>
														<p>
															{' '}
															{
																apartment?.apartment?.numberOfBedrooms
															} bedrooms,{' '}
															{apartment?.apartment?.numberOfToilets} Bathrooms{' '}
														</p>
													</div>
												</div>
												<div className='sect2'>
													<p
														style={{ fontSize: '14px', marginBottom: '.3rem' }}
													>
														<strong style={{ fontSize: '18px' }}>
															&#8358;
															{comma(String(apartment?.apartment?.price))}/
														</strong>{' '}
														night
													</p>
													<div
														className='d-flex'
														style={{ alignItems: 'center' }}
													>
														<MdOutlinePayments
															size={28}
															color='#155EEF'
															className='me-2'
														/>
														<p style={{ width: '80%' }}>
															Full refund when you cancel 24hrs before check-in
														</p>
													</div>
												</div>
											</div>

											<div className='col-md-12'>
												<form
													action=''
													style={{
														borderBottom: '1px solid rgba(45, 45, 45, 0.2)',
														marginBottom: '1rem',
													}}
												>
													<div className='apartment_formform_div'>
														<div className='row g-0'>
															<div className='col-lg-6 col-6'>
																<div
																	className='p-2 bor_bottom bor_right'
																	style={{ alignItems: 'center' }}
																>
																	<input
																		type='text'
																		placeholder='Check In'
																		className='form-control'
																		onFocus={(e) => (e.target.type = 'date')}
																		onBlur={(e) => (e.target.type = 'text')}
																		onChange={(e) =>
																			setCheckInDate(e.target.value)
																		}
																	/>
																</div>
															</div>
															<div className='col-lg-6 col-6 '>
																<div
																	className='p-2 bor_bottom'
																	style={{ alignItems: 'center' }}
																>
																	<input
																		type='text'
																		placeholder='Check Out'
																		className='form-control'
																		onFocus={(e) => (e.target.type = 'date')}
																		onBlur={(e) => (e.target.type = 'text')}
																		onChange={(e) =>
																			setCheckOutDate(e.target.value)
																		}
																	/>
																</div>
															</div>
															<div className='col-md-12'>
																<div className='p-2'>
																	<input
																		type='number'
																		placeholder='Guest'
																		className='form-control'
																		onChange={(e) =>
																			setNumberOfGuests(e.target.value)
																		}
																		required
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className='text-center'>
														<button className='btn form-control btn_save'>
															Check Availability
														</button>
														<button
															className='btn form-control btn_save'
															onClick={createBookingHandler}
															disabled={isCreatingBooking}
														>
															Book Now
														</button>
													</div>
													{/* {availability && <p> {availability} </p>} */}
												</form>
											</div>
											<div className='sect3'>
												<div className='d-flex justify-content-between'>
													<p>Nights</p>
													<p> 10 </p>
												</div>
												<div className='d-flex justify-content-between'>
													<p>Base price/night</p>
													<p> &#8358;{comma('12000')} </p>
												</div>
												<div className='d-flex justify-content-between'>
													<p> Total </p>
													<p> &#8358;{comma('120000')} </p>
												</div>
											</div>

											{booking && (
												<div className='col-12 pb-4'>
													<p>
														{' '}
														You have successfully booked an apartment. Please
														proceed to view booking and make payment.{' '}
													</p>
													<Link
														to={`/user/dashboard/my-bookings/${booking._id}`}
														className='btn btn-info text-white'
													>
														Proceed
													</Link>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='container'>
					<p>Apartment not found.</p>
				</div>
			)}

			<div className='grey_bg'>
				<div className='container'>
					<h5> Stil have questions? </h5>
					<p className='intro_para mb-0 pb-0'>
						For all stays less than 90 nights, call our team on +234 701 234
						5678 or email us at info@pebbles-signature.coms
					</p>
					<p className='intro_para mt-0'>
						For stays longer than 90 nights, email our sales team at
						sales@pebbles-signature.com.
					</p>
				</div>
			</div>

			{apartment && apartment?.apartment ? (
				<section className='explore_apartments trendy_apartments mb-0 pb-0'>
					<PageHeaderComponent
						topHeader='POPULAR'
						topHeaderColor='rgba(21, 94, 239, 0.8)'
						header='LANDMARKS AROUND HERE'
					/>
					<div className='container landmarks'>
						<div className='row row-mobile px-4'>
							{apartment?.apartment.landmark.map((item, index) => (
								<div className='col-3' key={index}>
									<img src={item.image} alt='' />
									<h5> {item.landmark} </h5>
									<p> {item.address} </p>
								</div>
							))}
						</div>
					</div>
				</section>
			) : null}

			<section className='explore_apartments'>
				{user_detail ? (
					<>
						<PageHeaderComponent
							topHeader='EXPLORE'
							topHeaderColor='rgba(21, 94, 239, 0.8)'
							header='APARTMENTS NEAR YOU'
							link='/apartments-near-you'
							linkText='View all'
						/>
						{nearbyApartments && nearbyApartments?.apartments.length > 0 ? (
							<ApartmentSlider
								data={nearbyApartments ? nearbyApartments?.apartments : []}
							/>
						) : (
							<ApartmentSlider
								data={allApartments ? allApartments?.apartments : []}
							/>
						)}
					</>
				) : (
					<>
						<PageHeaderComponent
							topHeader='EXPLORE'
							topHeaderColor='rgba(21, 94, 239, 0.8)'
							header='OUR APARTMENTS'
							link='/all-apartments'
							linkText='View all'
						/>
						<ApartmentSlider
							data={allApartments ? allApartments?.apartments : []}
						/>
					</>
				)}
			</section>
		</main>
	)
}

export default ApartmentDetails
