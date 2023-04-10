import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_booking_by_id } from '../../features/booking/bookingSlice'
import { Link, useParams } from 'react-router-dom'

const UserBookingDetailBusiness = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const { bookingDetail } = useAppSelector((state) => state.booking)

	useEffect(() => {
		dispatch(get_booking_by_id({ id: params?.id }))
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
			</div>
		</main>
	)
}

export default UserBookingDetailBusiness
