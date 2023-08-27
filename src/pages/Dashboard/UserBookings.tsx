import React, { useEffect, useState } from 'react'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	bookingReset,
	cancel_booking,
	get_user_bookings,
} from '../../features/booking/bookingSlice'
import { FaEye } from 'react-icons/fa'
import moment from 'moment'
import Loader from '../../components/Loader'
import EmptyPage from '../../components/EmptyPage'

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
		// 'Action',
	]

	const cancelHandler = async (e: any, id: string) => {
		e.preventDefault()
		if (window.confirm('Are you sure want to cancel this booking?')) {
			dispatch(cancel_booking({ bookingId: id }))
		}
	}

	useEffect(() => {
		dispatch(get_user_bookings())
		return () => {
			dispatch(bookingReset())
		}
	}, [dispatch, cancelSuccess])

	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(12)
	const [loading, setLoading] = useState(false)

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts =
		bookings &&
		bookings?.bookings
			?.filter((item) => item.bookingStatus !== 'CANCELLED')
			.slice(indexOfFirstPost, indexOfLastPost)

	const pageNumbers: number[] = []

	for (
		let i: number = 1;
		i <=
		Math.ceil(
			bookings && bookings?.bookings
				? bookings?.bookings?.length / postsPerPage
				: 0
		);
		i++
	) {
		pageNumbers.push(i)
	}

	const setPage = (pageNum: number) => {
		setCurrentPage(pageNum)
	}

	return (
		<main className='dashboard dashboard_bookings'>
			<div>
				<h6 className='table_title'>Reservation History</h6>
				{isFetchingBooking ? (
					<Loader />
				) : bookings && currentPosts && currentPosts?.length > 0 ? (
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
								{currentPosts?.map((booking) => (
									<tr key={booking._id}>
										<td>
											<SliderImages
												images={booking?.apartmentId?.apartmentImages}
											/>
											<Link
												to={`/user/dashboard/my-bookings/${booking._id}`}
												className='link-dark apart_name mt-2 d-block'
												style={{ fontWeight: '500' }}
											>
												{booking?.apartmentId?.apartmentName}
											</Link>
										</td>
										<td className='td_pad_top'>
											{booking?.apartmentId?.typeOfApartment}
										</td>
										<td className='td_pad_top'>
											{booking?.apartmentId?.address}
										</td>
										<td className='td_pad_top' style={{ width: '18rem' }}>
											{booking?.apartmentId?.facilities.map((item, index) => {
												return (
													index <= 2 && (
														<span key={index} style={{ paddingRight: 3 }}>
															{item}
															{index === 2 ? (
																<span>
																	<span>...</span>
																	<Link
																		to={`/user/dashboard/my-bookings/${booking?._id}`}
																	>
																		see more
																	</Link>
																</span>
															) : (
																','
															)}
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
										{/* <td className='td_pad_top'>
											{booking?.bookingStatus.toLowerCase() === 'pending' &&
												booking?.paymentStatus.toLowerCase() === 'pending' && (
													<Link
														to={`/user/dashboard/my-bookings/${booking._id}`}
														className='me-3 btn'
														style={{
															backgroundColor: '#155EEF',
															color: '#fff',
															borderRadius: '8px',
															fontSize: '11px',
															borderColor: '#155EEF',
															marginBottom: '.5rem',
														}}
													>
														Pay
													</Link>
												)}

											{booking?.cancellable ? (
												<button
													className='me-3 btn'
													style={{
														backgroundColor: '#ad1818',
														color: '#fff',
														borderRadius: '8px',
														fontSize: '11px',
														borderColor: '#ad1818',
														marginBottom: '.5rem',
													}}
													onClick={(e) => cancelHandler(e, booking._id)}
												>
													Cancel
												</button>
											) : (
												''
											)}
										</td> */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<EmptyPage
						header='You have not made any bookings yet'
						para='Your bookings will be shown here when you book an apartment'
					/>
				)}
			</div>
			{pageNumbers?.length > 1 && (
				<div className='my_paginate'>
					{pageNumbers.map((pageNum, index) => (
						<span
							key={index}
							className={pageNum === currentPage ? 'active' : ''}
							onClick={() => {
								setPage(pageNum)
							}}
						>
							{pageNum}
						</span>
					))}
				</div>
			)}
		</main>
	)
}

export default UserBookings
