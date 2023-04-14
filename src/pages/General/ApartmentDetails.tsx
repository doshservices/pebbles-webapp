import React, { useEffect, useLayoutEffect, useState } from 'react'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { comma } from '../../utils/helper'
import {
	// AiOutlineWifi,
	AiOutlineStop,
	AiOutlineClockCircle,
} from 'react-icons/ai'
// import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePool, MdOutlinePayments } from 'react-icons/md'
// import { SlScreenDesktop } from 'react-icons/sl'
// import { CgGym } from 'react-icons/cg'
import { TbMessageReport, TbDisabled } from 'react-icons/tb'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import abuja from '../../assets/abuja.png'
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
	reset,
	save_booking_to_state,
} from '../../features/booking/bookingSlice'
import { authHeader } from '../../utils/headers'
import { toast } from 'react-hot-toast'
import ModalComponent from '../../components/ModalComponent'
import moment from 'moment'

const ApartmentDetails = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	let url = 'https://pubblessignature-production.up.railway.app/api'

	const { user_detail, token } = useAppSelector((state) => state.auth)
	const { allApartments, apartment, isFetchingApartment, nearbyApartments } =
		useAppSelector((state) => state.apartment)
	const { booking, isCreatingBooking, bookingState } = useAppSelector(
		(state) => state.booking
	)

	const [photoIndex, setPhotoIndex] = useState<number>(0)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [checkInDate, setCheckInDate] = useState<string>('')
	const [checkOutDate, setCheckOutDate] = useState<string>('')
	const [numberOfGuests, setNumberOfGuests] = useState<string>('')
	const [availability, setAvailability] = useState<string[]>([])
	const [openModal, setOpenModal] = useState(false)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const pressHandler = async (e: any) => {
		e.preventDefault()
		setIsLoading(true)
		await axios({
			url: `${url}/bookings/booking/${apartment?.apartment?._id}`,
			method: 'GET',
			headers: authHeader(token ? token : '123'),
			// data: { apartmentId: id },
		})
			.then((res) => {
				setAvailability(res?.data?.data?.bookings)
				toast.success(res?.data?.data?.message, { position: 'top-center' })
				setOpenModal(true)
				setIsLoading(false)
			})
			.catch((err) => {
				console.log('error with fetching apartment availability', err)
				setIsLoading(false)
			})
		setIsLoading(false)
	}

	console.log('====================================')
	console.log('bookingState', bookingState)
	console.log('====================================')

	const createBookingHandler = (e: any) => {
		e.preventDefault()
		let data = {
			apartmentOwnerId: apartment?.apartment?.userId,
			apartmentId: apartment?.apartment?._id,
			checkInDate,
			checkOutDate,
			bookingAmount: apartment?.apartment?.price,
			numberOfGuests: Number(numberOfGuests),
		}
		if (user_detail) {
			dispatch(create_booking(data))
		} else {
			dispatch(save_booking_to_state(data))
			toast(
				'You have saved this apartment. Please create an account before you proceed to view booking and make payment.'
			)
			// alert('You must have an account before you can book an apartment.')
			// setTimeout(() => {
			// 	navigate('/auth/login')
			// }, 1000)
		}
	}

	useEffect(() => {
		dispatch(get_apartment_by_id({ id: params?.id }))

		return () => {
			dispatch(reset())
		}
	}, [params?.id, dispatch])

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
											<span style={{ paddingRight: 3 }} key={index}>
												{item}
												{index === apartment?.apartment?.facilities.length - 1
													? '.'
													: ','}
											</span>
										))}
									</div>
								</div>

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
														<button
															className='btn form-control btn_save'
															onClick={createBookingHandler}
															disabled={isCreatingBooking}
														>
															{isCreatingBooking ? (
																<i className='fas fa-spinner fa-spin'></i>
															) : (
																'Book Now'
															)}
														</button>
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
												<div className='col-12 pb-4'>
													<p>
														You have successfully booked an apartment. Please
														proceed to view booking and make payment.
													</p>
													<Link
														to={`/user/dashboard/my-bookings`}
														className='btn btn-info text-white'
													>
														Proceed
													</Link>
												</div>
											) : bookingState ? (
												<div className='col-12 pb-4'>
													<p>
														You have saved this apartment. Please create an
														account before you proceed to view booking and make
														payment.
													</p>
													<Link
														to={`/auth/login`}
														className='btn btn-info text-white'
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
			<ModalComponent
				open={openModal}
				toggle={() => setOpenModal(false)}
				title='Booked Dates'
			>
				<div className='container'>
					<ul>
						{availability.map((item, index) => (
							<li style={{ fontSize: '14px' }} key={index}>
								{moment(item).format('MMMM Do, YYYY')}
							</li>
						))}
					</ul>
				</div>
			</ModalComponent>
		</main>
	)
}

export default ApartmentDetails
