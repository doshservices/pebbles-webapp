import React, { useEffect } from 'react'
import building from '../../assets/building.png'
import SliderImages from '../../components/SliderImages'
import apartmentImg from '../../assets/picture.png'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_user_bookings, reset } from '../../features/booking/bookingSlice'
import { FaEye } from 'react-icons/fa'
import moment from 'moment'

const UserBookings = () => {
	const dispatch = useAppDispatch()

	const { bookings, isFetchingBooking } = useAppSelector(
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
		// 'Action',
	]

	const deleteHandler = async (e, obj) => {
		e.preventDefault()
	}

	useEffect(() => {
		dispatch(get_user_bookings())

		return () => {
			dispatch(reset())
		}
	}, [dispatch])

	return (
		<main className='dashboard dashboard_bookings'>
			<div>
				<h6>Booking History</h6>
				{bookings && bookings?.bookings?.length > 0 ? (
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
												<FaEye size={18} />
											</Link>
										</td>
										{/* <td className='td_pad_top'>
											<a
												href='#/'
												className='me-3 link-dark'
												onClick={(e) => deleteHandler(e, booking)}
											>
												
											</a>
										</td> */}
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
