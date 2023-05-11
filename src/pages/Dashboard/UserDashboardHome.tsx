import React, { useEffect } from 'react'
import LineChart from '../../components/LineChart'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	create_booking,
	delete_booking_from_state,
	get_user_bookings,
} from '../../features/booking/bookingSlice'
import {
	apartmentReset,
	get_apartments_by_user,
	get_saved_apartments,
} from '../../features/apartment/apartmentSlice'
import { get_all_notifications } from '../../features/notification/notificationSlice'

const UserDashboardHome = () => {
	const dispatch = useAppDispatch()
	const dataData1 = [8, 29, 7, 8, 5, 1, 2]
	const dataData2 = [12, 19, 3, 5, 2, 3, 6]

	const { bookingState, bookings } = useAppSelector((state) => state.booking)
	const { user_detail } = useAppSelector((state) => state.auth)
	const { userApartments, savedApartments } = useAppSelector(
		(state) => state.apartment
	)
	const { notifications } = useAppSelector((state) => state.notification)

	useEffect(() => {
		if (bookingState) {
			dispatch(create_booking(bookingState))

			setTimeout(() => {
				dispatch(delete_booking_from_state())
			}, 100)
		}

		dispatch(get_apartments_by_user())
		dispatch(get_all_notifications())
		dispatch(get_saved_apartments())
		dispatch(get_user_bookings())
		return () => {
			dispatch(apartmentReset())
		}
	}, [dispatch])

	return (
		<main className='dashboard'>
			<h6 className=''> All Time </h6>
			<div className='row mb-4'>
				{user_detail?.role !== 'USER' && (
					<div className='col-md-3 col-sm-6'>
						<div className='stat_box stat_box1'>
							<h5>
								{userApartments?.apartments
									? userApartments?.apartments?.filter(
											(item) => item.isAvailable === false
									  ).length
									: 0}
							</h5>
							<p> Apartments Booked </p>
						</div>
					</div>
				)}
				<div
					className={
						user_detail?.role !== 'USER'
							? 'col-md-3 col-sm-6'
							: 'col-md-4 col-sm-6'
					}
				>
					<div className='stat_box stat_box2'>
						{user_detail?.role === 'USER' ? (
							<>
								<h5>
									{savedApartments?.apartment
										? savedApartments?.apartment?.length
										: 0}
								</h5>
								<p> My Wishlist </p>
							</>
						) : (
							<>
								<h5>
									{userApartments?.apartments
										? userApartments?.apartments?.length
										: 0}
								</h5>

								<p> Listed Apartments </p>
							</>
						)}
					</div>
				</div>
				<div
					className={
						user_detail?.role !== 'USER'
							? 'col-md-3 col-sm-6'
							: 'col-md-4 col-sm-6'
					}
				>
					<div className='stat_box stat_box3'>
						<h5> {bookings?.bookings ? bookings?.bookings?.length : 0} </h5>
						<p> My Bookings </p>
					</div>
				</div>
				<div
					className={
						user_detail?.role !== 'USER'
							? 'col-md-3 col-sm-6'
							: 'col-md-4 col-sm-6'
					}
				>
					<div className='stat_box stat_box4'>
						<h5>
							{' '}
							{notifications?.notifications
								? notifications?.notifications?.length
								: 0}{' '}
						</h5>
						<p> Notifications </p>
					</div>
				</div>
			</div>

			<div>
				<select
					className='form-select mb-3'
					style={{ width: '10rem', fontSize: '14px' }}
				>
					<option value='week'> Week </option>
					<option value='month'> Month </option>
				</select>
				<LineChart userData1={dataData1} userData2={dataData2} />
			</div>
		</main>
	)
}

export default UserDashboardHome
