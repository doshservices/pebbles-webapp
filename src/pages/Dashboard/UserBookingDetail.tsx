import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	flutter_pay_booking,
	get_booking_by_id,
} from '../../features/booking/bookingSlice'
import { Link, useParams } from 'react-router-dom'
import flutter from '../../assets/flutterwave.svg'

const UserBookingDetail = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const { bookingDetail, flutterBooking, isFlutterBooking } = useAppSelector(
		(state) => state.booking
	)

	useEffect(() => {
		dispatch(get_booking_by_id({ id: params?.id }))

		let data = {
			bookingId: bookingDetail?.booking?._id,
			paymentMethod: 'FLUTTERWAVE',
		}

		dispatch(flutter_pay_booking(data))
	}, [dispatch, params?.id, bookingDetail?.booking?._id])

	return (
		<main className='dashboard dashboard_bookings'>
			<div>
				<h6> Booking Details </h6>

				<div
					className='pebbles_form pb-5 mb-2'
					style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.4)' }}
				>
					<form autoComplete='off'>
						<div className='row'>
							<>
								<div className='col-md-12'>
									<label htmlFor=''>Apartment Name</label>
									<input
										type='text'
										value={bookingDetail?.booking?.apartmentId?.apartmentName}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Payment Status</label>
									<input
										type='text'
										value={bookingDetail?.booking?.paymentStatus.toLowerCase()}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Booking Status</label>
									<input
										type='text'
										value={bookingDetail?.booking?.bookingStatus.toLowerCase()}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Payment Amount</label>
									<input
										type='text'
										value={bookingDetail?.booking?.bookingAmount}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Guests</label>
									<input
										type='text'
										value={bookingDetail?.booking?.numberOfGuests}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Check-In Date</label>
									<input
										type='text'
										value={bookingDetail?.booking?.checkInDate}
										disabled
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label htmlFor=''>Check-Out Date</label>
									<input
										type='text'
										value={bookingDetail?.booking?.checkOutDate}
										disabled
										className='form-control'
									/>
								</div>
							</>
						</div>
					</form>
				</div>

				{bookingDetail?.booking?.bookingStatus.toLowerCase() === 'pending' &&
				bookingDetail?.booking?.paymentStatus.toLowerCase() === 'pending' ? (
					<div className=' mt-4'>
						{/* <Link
							className='btn btn-primary mr-4 text-white'
							to={`/dashboard/bookings/${bookingDetail?.booking._id}/wallet`}
							style={{ fontSize: '12px' }}
						>
							Pay with wallet
						</Link> */}
						<p className='d-block'> Pay with: </p>
						{flutterBooking && (
							<a
								className='btn btn-white mr-4'
								href={flutterBooking.booking}
								style={{ fontSize: '12px', border: '1px solid #000' }}
								aria-disabled={isFlutterBooking}
							>
								{isFlutterBooking ? (
									<i className='fas fa-spinner fa-spin'></i>
								) : (
									<>
										<img src={flutter} alt='' style={{ width: 120 }} />
									</>
								)}
							</a>
						)}
					</div>
				) : null}
			</div>
		</main>
	)
}

export default UserBookingDetail
