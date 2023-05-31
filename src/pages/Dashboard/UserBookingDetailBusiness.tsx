import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_booking_by_id } from '../../features/booking/bookingSlice'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import Loader from '../../components/Loader'
import white_house from '../../assets/white_house.png'
import black_house from '../../assets/black_house.png'
import user_setting from '../../assets/user_setting.png'
import moment from 'moment'
import { comma } from '../../utils/helper'

const UserBookingDetailBusiness = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const { bookingDetail, isFetchingBooking } = useAppSelector(
		(state) => state.booking
	)

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
	}, [dispatch, params?.id, bookingDetail?.booking?._id])

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
										<img src={white_house} alt='house icon' />
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
										{bookingDetail?.booking?.numberOfGuests}{' '}
										{bookingDetail &&
										bookingDetail?.booking?.numberOfGuests == '1'
											? 'Person'
											: 'People'}
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
										{bookingDetail?.booking?.apartmentId.typeOfApartment}
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

							<div className='row'>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Booking Status
									</p>
									<p className='bot_text'>
										{bookingDetail?.booking?.bookingStatus.toLowerCase()}
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										{' '}
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Booking Created At
									</p>
									<p className='bot_text'>
										{moment(bookingDetail?.booking?.createdAt).format(
											'MMMM Do'
										)}
									</p>
								</div>
								<div className='col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6 detail_box_div'>
									<p className='top_text'>
										<span className='me-2'>
											<img src={black_house} alt='' />
										</span>{' '}
										Payment Status
									</p>
									<p className='bot_text'>
										{bookingDetail?.booking?.paymentStatus?.toLowerCase()}
									</p>
								</div>
							</div>

							<div className='d-flex justify-content-between mt-3 mb-2'>
								<div style={{ width: '20%', marginRight: '2rem' }}>
									<h6> Apartment Amenities </h6>
								</div>
								<div>
									<p>
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
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

export default UserBookingDetailBusiness
