import React, { useEffect, useMemo } from 'react'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	cancel_booking,
	get_user_bookings,
} from '../../features/booking/bookingSlice'
import { FaEye } from 'react-icons/fa'
import moment from 'moment'
import Loader from '../../components/Loader'

const UserBookings = () => {
	const dispatch = useAppDispatch()

	const { bookings, isFetchingBooking, cancelSuccess } = useAppSelector(
		(state) => state.booking
	)

	const tableHeaders = [
		'Apartment name',
		'Apartment Type',
		'Location',
		'Amenities',
		'Booked Date',
		'Booking Status',
		'Payment Status',
		'View',
		'Action',
	]

	const cancelHandler = async (e: any, id: string) => {
		e.preventDefault()
		if (window.confirm('Are you sure want to cancel this booking?')) {
			dispatch(cancel_booking({ bookingId: id }))
		}
	}

	// useMemo(
	// 	() => dispatch(get_user_bookings()),
	// 	[dispatch, bookings?.bookings?.length]
	// )

	useEffect(() => {
		dispatch(get_user_bookings())
	}, [dispatch, cancelSuccess])

	return (
		<main className='dashboard dashboard_bookings'>
			<div>
				<h6>Booking History</h6>
				{isFetchingBooking ? (
					<Loader />
				) : bookings && bookings?.bookings?.length > 0 ? (
					<div className='table-responsive'>
						<table className='table ' style={{ fontSize: '12px' }}>
							<thead className=''>
								<tr>
									{tableHeaders.map((item, index) => (
										<th key={index}> {item} </th>
									))}
								</tr>
							</thead>
							<tbody>
								{bookings?.bookings?.map((booking) => (
									<tr key={booking._id}>
										<td>
											<SliderImages
												images={booking?.apartmentId?.apartmentImages}
											/>
											<p className='apart_name'>
												{booking?.apartmentId?.apartmentName}
											</p>
										</td>
										<td className='td_pad_top'>
											{booking?.apartmentId?.typeOfApartment}
										</td>
										<td className='td_pad_top'>
											{booking?.apartmentId?.address}
										</td>
										<td className='td_pad_top' style={{ width: '20rem' }}>
											{booking?.apartmentId?.facilities.map((item, index) => {
												return (
													index <= 5 && (
														<span key={index} style={{ paddingRight: 3 }}>
															{item}
															{index === 5 ? '...' : ','}
														</span>
													)
												)
											})}
										</td>
										<td className='td_pad_top'>
											{moment(booking.checkInDate).format('MMMM Do') +
												'-' +
												moment(booking.checkOutDate).format('MMMM Do')}
										</td>
										<td className='td_pad_top'>
											{booking.bookingStatus.toLowerCase()}
										</td>
										<td className='td_pad_top'>
											{booking.paymentStatus.toLowerCase()}
										</td>
										<td className='td_pad_top'>
											<Link
												to={`/user/dashboard/my-bookings/${booking._id}`}
												className='link-dark'
											>
												<div className='tooltipp'>
													<FaEye size={18} color='#000' />

													<span className='tooltipptext'>View Details</span>
												</div>
											</Link>
										</td>
										<td className='td_pad_top'>
											{booking?.paymentStatus === 'PENDING' && (
												<Link
													to={`/user/dashboard/my-bookings/${booking._id}`}
													className='me-3 btn'
													style={{
														backgroundColor: 'blue',
														color: '#fff',
														borderRadius: '8px',
														fontSize: '12px',
														borderColor: 'blue',
														marginBottom: '.5rem',
													}}
												>
													Pay
												</Link>
											)}

											<button
												className='me-3 btn'
												style={{
													backgroundColor: 'red',
													color: '#fff',
													borderRadius: '8px',
													fontSize: '12px',
													borderColor: 'red',
													marginBottom: '.5rem',
												}}
												onClick={(e) => cancelHandler(e, booking._id)}
											>
												Cancel
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<p>No bookings found</p>
					</div>
				)}
			</div>
		</main>
	)
}

export default UserBookings
