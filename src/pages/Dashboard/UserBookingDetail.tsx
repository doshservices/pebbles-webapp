import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	cancel_booking,
	flutter_pay_booking,
	get_booking_by_id,
} from '../../features/booking/bookingSlice'
import { useNavigate, useParams } from 'react-router-dom'
import flutter from '../../assets/flutterwave.svg'
import white_house from '../../assets/white_house.png'
import black_house from '../../assets/black_house.png'
import user_setting from '../../assets/user_setting.png'
import moment from 'moment'
import { comma } from '../../utils/helper'
import Slider from 'react-slick'
import Loader from '../../components/Loader'
import { AiOutlineProfile } from 'react-icons/ai'

const UserBookingDetail = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const {
		bookingDetail,
		flutterBooking,
		isFlutterBooking,
		isFetchingBooking,
		// cancelSuccess,
	} = useAppSelector((state) => state.booking)

	const settings = {
		dots: false,
		infinite: bookingDetail?.booking?.apartmentId?.featuredImages?.length > 4,
		speed: 1000,
		slidesToShow: 4,
		arrows: true,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 9000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite:
						bookingDetail?.booking?.apartmentId?.featuredImages?.length > 4,
					dots: true,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					arrows: false,
				},
			},
		],
	}

	useEffect(() => {
		dispatch(get_booking_by_id({ id: params?.id }))

		let data = {
			bookingId: bookingDetail?.booking?._id,
			paymentMethod: 'FLUTTERWAVE',
		}

		dispatch(flutter_pay_booking(data))
	}, [dispatch, params?.id, bookingDetail?.booking?._id])

	const cancelHandler = async (e: any, id: string) => {
		e.preventDefault()
		if (window.confirm('Are you sure want to cancel this booking?')) {
			dispatch(cancel_booking({ bookingId: id }))

			navigate('/user/dashboard/my-bookings')
		}
	}

	return (
		<main className='dashboard dashboard_bookings'>
			{isFetchingBooking ? (
				<Loader />
			) : (
				<div>
					<div className='detail_box'>
						<div className='bg-white px-3 pt-4 pb-4'>
							<h6 className='mb-4 pb-2'> Booking Detail </h6>
							{/* <div className='d-flex flex-wrap justify-content-between align-items-center'> */}
							<div className='row'>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<div className='white_house'>
										<AiOutlineProfile size={28} color='#fff' />
									</div>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										Booking ID #
										{bookingDetail?.booking?._id.substring(
											bookingDetail?.booking?._id.length - 5,
											bookingDetail?.booking?._id.length
										)}
									</p>
									<p className='bot_text'>
										{bookingDetail?.booking?.apartmentId.apartmentName}
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={user_setting} alt='' />
										</span>{' '}
										Expected Guest
									</p>
									<p className='bot_text'>
										{bookingDetail?.booking?.numberOfGuests} People
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Apartment Type
									</p>
									<p className='bot_text'>
										{bookingDetail?.booking?.apartmentId.typeOfApartment} People
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Booking Date
									</p>
									<p className='bot_text'>
										{moment(bookingDetail?.booking?.checkInDate).format(
											'MMMM Do'
										)}{' '}
										-{' '}
										{moment(bookingDetail?.booking?.checkOutDate).format(
											'MMMM Do'
										)}
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Booking Price
									</p>
									<p className='bot_text'>
										Total: &#8358;
										{comma(String(bookingDetail?.booking?.bookingAmount))}
									</p>
								</div>
							</div>
							<hr />
							<div className='row mt-4 mb-2 '>
								<div className='col-md-4 col-3'>
									<h6> Apartment Amenities </h6>
								</div>
								<div className='col-md-8 col-9'>
									<p className='text-end'>
										{bookingDetail?.booking?.apartmentId?.facilities.map(
											(item, index) => {
												return (
													index <= 8 && (
														<span key={index} style={{ paddingRight: 3 }}>
															{item}
															{index === 8 ? '...' : ','}
														</span>
													)
												)
											}
										)}
									</p>
								</div>
							</div>
							<div>
								{bookingDetail?.booking?.apartmentId?.apartmentImages
									?.length !== 0 ? (
									<div className='px_5'>
										<Slider {...settings}>
											{bookingDetail?.booking?.apartmentId?.featuredImages.map(
												(item: string, index: number) => (
													<div key={index} className='p_4 px-2'>
														<img
															src={item}
															alt=''
															className='img-fluid'
															style={{
																borderRadius: '8px',
																height: '192px',
																width: '100%',
																objectFit: 'cover',
																overflow: 'hidden',
															}}
														/>
													</div>
												)
											)}
										</Slider>
									</div>
								) : (
									<p> No apartments found. </p>
								)}
							</div>
							<div className='d-flex justify-content-end'>
								{bookingDetail?.booking?.bookingStatus.toLowerCase() ===
									'pending' &&
								bookingDetail?.booking?.paymentStatus.toLowerCase() ===
									'pending' ? (
									<div className=' mt-4'>
										{flutterBooking && (
											<a
												className='btn btn-white mr-4 detail_box_btn'
												href={flutterBooking.booking}
												style={{
													fontSize: '12px',
													border: '1px solid #000',
													borderRadius: '4px',
												}}
												aria-disabled={isFlutterBooking}
											>
												{isFlutterBooking ? (
													<i className='fas fa-spinner fa-spin'></i>
												) : (
													<span>
														Pay With{' '}
														<img src={flutter} alt='' style={{ width: 120 }} />
													</span>
												)}
											</a>
										)}
									</div>
								) : null}
								{bookingDetail && bookingDetail?.booking?.cancellable && (
									<div className=' mt-4'>
										<button
											className='me-3 btn detail_box_btn'
											style={{
												background: '#FCFCFC',
												borderRadius: '4px',
												fontSize: '12px',
												borderColor: '#FF453A',
												color: '#FF453A',
												marginBottom: '.5rem',
												marginLeft: '1rem',
												width: '10rem',
												height: '2.3rem',
											}}
											onClick={(e) =>
												cancelHandler(e, bookingDetail?.booking?._id)
											}
										>
											Cancel Booking
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

export default UserBookingDetail
