import React, { useEffect, useLayoutEffect, useState } from 'react'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import { Link, useParams } from 'react-router-dom'
import { comma } from '../../utils/helper'
import { MdOutlinePayments } from 'react-icons/md'
import { TbMessageReport, TbDisabled } from 'react-icons/tb'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import two_users from '../../assets/two_users.png'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_apartment_by_id } from '../../features/apartment/apartmentSlice'
import Loader from '../../components/Loader'
import axios from 'axios'
import {
	create_booking,
	bookingReset,
	save_booking_to_state,
} from '../../features/booking/bookingSlice'
import { header } from '../../utils/headers'
import { toast } from 'react-hot-toast'
import ModalComponent from '../../components/ModalComponent'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import ac_unit from '../../assets/apartment_icons/ac_unit.svg'
import assured_workload from '../../assets/apartment_icons/assured_workload.svg'
import balcony from '../../assets/apartment_icons/balcony.svg'
import business_center from '../../assets/apartment_icons/business_center.svg'
// import deck from '../../assets/apartment_icons/deck.svg'
import elevator from '../../assets/apartment_icons/elevator.svg'
import engineering from '../../assets/apartment_icons/engineering.svg'
import fitness_center from '../../assets/apartment_icons/fitness_center.svg'
import garage from '../../assets/apartment_icons/garage.svg'
import hot_tub from '../../assets/apartment_icons/hot_tub.svg'
import kitchen from '../../assets/apartment_icons/kitchen.svg'
import local_bar from '../../assets/apartment_icons/local_bar.svg'
import local_laundry from '../../assets/apartment_icons/local_laundry.svg'
import meeting_room from '../../assets/apartment_icons/meeting_room.svg'
import mode_fan from '../../assets/apartment_icons/mode_fan.svg'
import nest_cam from '../../assets/apartment_icons/nest_cam.svg'
import pets from '../../assets/apartment_icons/pets.svg'
import pool from '../../assets/apartment_icons/pool.svg'
import smoke_free from '../../assets/apartment_icons/smoke_free.svg'
import tv from '../../assets/apartment_icons/tv.svg'
import warehouse from '../../assets/apartment_icons/warehouse.svg'
import wifi from '../../assets/apartment_icons/wifi.svg'
import pin_drop from '../../assets/apartment_icons/pin_drop.svg'
// import long_term from '../../assets/apartment_icons/long_term.png'
import short_term from '../../assets/apartment_icons/short_term.svg'
import furnished from '../../assets/apartment_icons/furnished.svg'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { AiOutlineClockCircle, AiOutlineStop } from 'react-icons/ai'

const ApartmentDetails = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	let url = 'https://pubblessignature-production.up.railway.app/api'

	const { user_detail } = useAppSelector((state) => state.auth)
	const { allApartments, apartment, isFetchingApartment, nearbyApartments } =
		useAppSelector((state) => state.apartment)
	const { booking, isCreatingBooking, bookingState } = useAppSelector(
		(state) => state.booking
	)

	const [createType, setCreateType] = useState<number | null>()
	const [limitValue, setLimitValue] = useState<number | null>(3)
	const [limit, setLimit] = useState<boolean>(false)
	const [photoIndex, setPhotoIndex] = useState<number>(0)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [numberOfGuests, setNumberOfGuests] = useState<string>('')
	const [availability, setAvailability] = useState<string[]>([])
	const [openModal, setOpenModal] = useState(false)

	const [showDate, setShowDate] = useState(false)

	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	])

	const showDateHandler = () => {
		setShowDate(!showDate)
	}

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const toggleMore = () => {
		setLimit(!limit)
	}

	const pressHandler = async (e: any) => {
		e.preventDefault()
		setIsLoading(true)
		await axios({
			url: `${url}/bookings/booking/${apartment?.apartment?._id}`,
			method: 'GET',
			headers: header,
		})
			.then((res) => {
				setAvailability(res?.data?.data?.bookings)
				toast.success(res?.data?.data?.message, { position: 'top-center' })
				setOpenModal(true)
				setIsLoading(false)
			})
			.catch((err) => {
				setIsLoading(false)
			})
		setIsLoading(false)
	}

	const dateSelectHandler = (item: any) => {
		setState([item.selection])
		if (item.selection.startDate !== item.selection.endDate) setShowDate(false)
	}

	const createBookingHandler = (e: any, num: number) => {
		setCreateType(num)
		e.preventDefault()
		let data = {
			apartmentOwnerId: apartment?.apartment?.userId,
			apartmentId: apartment?.apartment?._id,
			checkInDate: moment(state[0].startDate).format(),
			checkOutDate: moment(state[0].endDate).format(),
			bookingAmount: apartment?.apartment?.price,
			numberOfGuests: Number(numberOfGuests),
		}
		if (user_detail) {
			if (
				Number(numberOfGuests) <= Number(apartment?.apartment?.numberOfGuests)
			) {
				dispatch(create_booking(data))
			} else {
				toast.error('Number of guests exceeds maximum apartment capacity')
			}
		} else {
			dispatch(save_booking_to_state(data))
			toast(
				'You have saved this apartment. Please create an account before you proceed to view booking and make payment.'
			)
		}
	}

	useEffect(() => {
		dispatch(get_apartment_by_id({ id: params?.id }))

		return () => {
			dispatch(bookingReset())
		}
	}, [params?.id, dispatch])

	useEffect(() => {
		if (limit) {
			setLimitValue(apartment && apartment?.apartment?.facilities?.length - 1)
		} else {
			setLimitValue(3)
		}
	}, [limit])

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
							VIEW {apartment?.apartment?.apartmentImages?.length} PHOTOS
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

									<div className='row'>
										{limitValue &&
											apartment?.apartment?.facilities.map((item, index) => (
												<div className='col-md-6 col-sm-6' key={index}>
													{index <= limitValue ? (
														<div className='d-flex amenities_div align-items-center mb-3'>
															{item === '24hrs Power Supply' ? (
																<HiOutlineLightBulb size={22} />
															) : item === 'Wi-Fi' ? (
																<img
																	src={wifi}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item ===
															  'Television- Netflix, dstv, Hulu, Amazon etc' ? (
																<img
																	src={tv}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Swimming pool' ? (
																<img
																	src={pool}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item ===
															  'Kitchen with appliances such as refrigerator, stove, oven, and microwave' ? (
																<img
																	src={kitchen}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Washer and dryer' ? (
																<img
																	src={local_laundry}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Heating and air conditioning' ? (
																<img
																	src={ac_unit}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Parking (garage or covered)' ? (
																<img
																	src={garage}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Elevator' ? (
																<img
																	src={elevator}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Gym or fitness center' ? (
																<img
																	src={fitness_center}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Hot tub' ? (
																<img
																	src={hot_tub}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Business center' ? (
																<img
																	src={business_center}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Conference room' ? (
																<img
																	src={meeting_room}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Clubhouse' ? (
																<img
																	src={local_bar}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Controlled access' ? (
																<img
																	src={mode_fan}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Pet-friendly' ? (
																<img
																	src={pets}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Balcony or patio' ? (
																<img
																	src={balcony}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Storage space' ? (
																<img
																	src={warehouse}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Smoke-free' ? (
																<img
																	src={smoke_free}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'On-site maintenance' ? (
																<img
																	src={engineering}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'On-site management' ? (
																<img
																	src={assured_workload}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === '24/7 CCTV Surveillance' ? (
																<img
																	src={nest_cam}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item ===
															  'Close to shops, restaurants, and entertainment' ? (
																<img
																	src={pin_drop}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Furnished options available' ? (
																<img
																	src={furnished}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : item === 'Short-term leases available' ? (
																<img
																	src={short_term}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															) : (
																<img
																	src={warehouse}
																	alt='amenity icon'
																	className='amenity_icon'
																/>
															)}
															<p className='amenity_para'> {item} </p>
														</div>
													) : null}
												</div>
											))}
									</div>
									<button
										onClick={() => toggleMore()}
										className='btn btn-primary mt-3  btn_white_blue'
									>
										{!limit ? (
											<span>
												Show all {apartment?.apartment?.facilities?.length}{' '}
												Amenities
											</span>
										) : (
											<span> Close </span>
										)}
									</button>
								</div>

								<div className='booking_policy'>
									<h5 className='pt-4 mb-4'> Booking Policies </h5>
									<div>
										<div className='row'>
											<div className='col-lg-6 col-md-12'>
												<div style={{ width: '90%' }}>
													<div className='d-flex'>
														<div>
															<AiOutlineClockCircle />
														</div>
														<div className='detail_div'>
															<h6> Check-in is at 3:00pm </h6>
															<h6> Check-out is at 11:00pm </h6>
														</div>
													</div>
													<div>
														<p className='intro_para'>
															You may request early check-in and/or late
															check-out after booking. Our team will do our best
															to accommodate any requests based on availability.
														</p>
													</div>
												</div>
											</div>
											<div className='col-lg-6 col-md-12'>
												<div style={{ width: '90%' }}>
													<div className='d-flex'>
														<div>
															<AiOutlineStop />
														</div>
														<div className='detail_div'>
															<h6> House Rules </h6>
														</div>
													</div>
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
											<div className='col-lg-6 col-md-12'>
												<div style={{ width: '90%' }}>
													<div className='d-flex'>
														<div>
															<TbMessageReport />
														</div>
														<div className='detail_div'>
															<h6> Note </h6>
														</div>
													</div>
													<ul className='intro_para'>
														<li> A mini fridge is available on request.</li>
														<li>
															No room service or on-site parking available.
														</li>
													</ul>
												</div>

												<div style={{ width: '90%' }}>
													<div className='d-flex'>
														<div>
															<TbDisabled />
														</div>
														<div className='detail_div'>
															<h6> Accessibity </h6>
														</div>
													</div>
													<ul className='intro_para'>
														<li> Wheelchair accessibility not available</li>
														<li>Elevators available</li>
													</ul>
												</div>
											</div>
											<div className='col-lg-6 col-md-12'>
												<div style={{ width: '90%' }}>
													<div className='d-flex'>
														<div>
															<TbMessageReport />
														</div>
														<div className='detail_div'>
															<h6> Refund Policy </h6>
														</div>
													</div>
													<p className='intro_para'>
														We offer flexible cancellations for all bookings.
														Select the Flex Rate to cancel your booking up to
														24hrs before check-in and receive a full refund. For
														longer stays that are paid monthly, we require at
														least 15 days notice to cancel or modify without
														fees.
													</p>
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
															<div
																className='col-12'
																style={{ position: 'relative' }}
															>
																<div
																	className='form-control input'
																	onClick={showDateHandler}
																	style={{
																		borderRadius: '2px 2px 0px 0px',
																		borderBottom: '1px solid #000',
																		height: 48,
																	}}
																>
																	<p
																		className='mb-0 pb-0'
																		style={{ fontSize: '14px' }}
																	>
																		{moment(state[0].startDate).format(
																			'YYYY-MM-DD'
																		) ===
																			String(
																				moment(new Date()).format('YYYY-MM-DD')
																			) &&
																		moment(state[0].endDate).format(
																			'YYYY-MM-DD'
																		) ===
																			String(
																				moment(new Date()).format('YYYY-MM-DD')
																			)
																			? 'Check-in Date - Check-out Date'
																			: `${moment(state[0].startDate).format(
																					'ddd, MMMM Do'
																			  )} - ${moment(state[0].endDate).format(
																					'ddd, MMMM Do'
																			  )}`}
																	</p>
																</div>
																{showDate && (
																	<div className='search_component_div_date apart_det_date'>
																		<DateRange
																			editableDateInputs={true}
																			onChange={(item: any) =>
																				dateSelectHandler(item)
																			}
																			moveRangeOnFirstSelection={false}
																			ranges={state}
																			minDate={new Date()}
																			disabledDates={availability?.map(
																				(item) => new Date(item)
																			)}
																		/>
																	</div>
																)}
															</div>
															<div className='col-md-12'>
																<div className='p-2'>
																	<input
																		type='number'
																		placeholder='Guest'
																		className='form-control'
																		max={apartment?.apartment?.numberOfGuests}
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
														<button
															className='btn form-control btn_save'
															onClick={pressHandler}
															disabled={isLoading}
														>
															{isLoading ? (
																<i className='fas fa-spinner fa-spin'></i>
															) : (
																'Check Availability'
															)}
														</button>
														<div
															className='d-flex'
															style={{ marginTop: '-1.3rem' }}
														>
															<button
																className='btn form-control btn_save me-2'
																style={{
																	backgroundColor: '#fff',
																	color: '#155EEF',
																	border: '1px solid #155EEF',
																}}
																onClick={(e) => createBookingHandler(e, 2)}
																disabled={isCreatingBooking}
															>
																{isCreatingBooking && createType === 2 ? (
																	<i className='fas fa-spinner fa-spin'></i>
																) : (
																	'Reserve'
																)}
															</button>
															<button
																className='btn form-control btn_save ms-2'
																onClick={(e) => createBookingHandler(e, 1)}
																disabled={isCreatingBooking}
															>
																{isCreatingBooking && createType === 1 ? (
																	<i className='fas fa-spinner fa-spin'></i>
																) : (
																	'Book Now'
																)}
															</button>
														</div>
													</div>
												</form>
											</div>
											{/* <div className='sect3'>
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
											</div> */}

											{booking ? (
												<>
													{createType === 1 ? (
														<div className='col-12 pb-4'>
															<p>
																You have successfully booked an apartment.
																Please proceed to view booking and make payment.
															</p>
															<Link
																to={`/user/dashboard/my-bookings/${booking?._id}`}
																className='btn btn_save text-white'
															>
																Proceed
															</Link>
														</div>
													) : (
														<div className='col-12 pb-4'>
															<p>
																You have successfully reserved this apartment.
																Please payment should be made not later than
																24hrs after reservation.
															</p>
															<Link
																to={`/user/dashboard/my-bookings`}
																className='btn btn_save text-white'
															>
																View Bookings
															</Link>
														</div>
													)}
												</>
											) : bookingState ? (
												<div className='col-12 pb-4'>
													<p>
														You have saved this apartment. Please create an
														account before you proceed to view booking and make
														payment.
													</p>
													<Link
														to={`/auth/login`}
														className='btn btn_save text-white'
													>
														Proceed
													</Link>
												</div>
											) : null}
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
					<h5> Still have questions? </h5>
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
							{apartment?.apartment?.landmark?.length > 0 ? (
								apartment?.apartment.landmark.map((item, index) => (
									<div className='col-3' key={index}>
										<img src={item.image} alt='' />
										<h5> {item.landmark} </h5>
										<p> {item.address} </p>
									</div>
								))
							) : (
								<p> There are no landmarks uploaded for this apartment yet. </p>
							)}
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
			<ModalComponent
				open={openModal}
				toggle={() => setOpenModal(false)}
				title='Booked Dates'
			>
				<div className='container'>
					{availability?.length > 0 ? (
						<ul>
							{availability.map((item, index) => (
								<li style={{ fontSize: '14px' }} key={index}>
									{moment(item).format('MMMM Do, YYYY')}
								</li>
							))}
						</ul>
					) : (
						<p style={{ fontSize: '14px' }}> Apartment has no booked dates. </p>
					)}
				</div>
			</ModalComponent>
		</main>
	)
}

export default ApartmentDetails
