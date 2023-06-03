import React, { useEffect, useState } from 'react'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../components/Loader'
import {
	delete_notification,
	get_all_notifications,
} from '../../features/notification/notificationSlice'
import EmptyPage from '../../components/EmptyPage'

const UserNotifications = () => {
	const dispatch = useAppDispatch()

	const { notifications, isLoading, isDeleting, deleteSuccess } =
		useAppSelector((state) => state.notification)

	const [notificationID, setNotificationID] = useState('')

	const tableHeaders = ['Apartment', 'Message', 'Price', 'Status', 'Action']

	const deleteHandler = async (e: any, string: string) => {
		e.preventDefault()
		setNotificationID(string)
		dispatch(delete_notification({ id: string }))
	}

	useEffect(() => {
		dispatch(get_all_notifications())
	}, [dispatch, deleteSuccess])

	return (
		<main className='dashboard dashboard_bookings dashboard_listings'>
			<div>
				{isLoading ? (
					<Loader />
				) : notifications && notifications?.notifications?.length > 0 ? (
					<Tabs>
						<div className='row'>
							<div className='col-md-6 col-sm-8 '>
								<TabList className='d-flex justify-content-between roww'>
									<Tab>
										All Notifications ({notifications?.notifications?.length})
									</Tab>
								</TabList>
							</div>
						</div>

						<TabPanel>
							{notifications?.notifications?.length > 0 ? (
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
											{notifications?.notifications?.map((notification) => (
												<tr key={notification._id}>
													<td>
														<SliderImages
															images={
																notification?.apartmentId?.apartmentImages
															}
														/>
														<p className='apart_name'>
															{notification?.apartmentId?.apartmentName}
														</p>
													</td>
													<td className='td_pad_top' style={{ width: '20rem' }}>
														{notification.message}
													</td>
													<td className='td_pad_top'>{notification.price}</td>

													<td className='td_pad_top'>
														{' '}
														{notification?.bookingId?.bookingStatus}{' '}
													</td>

													<td className='td_pad_top'>
														<button
															className='border-none bg-white'
															style={{ border: 'none' }}
															onClick={(e) =>
																deleteHandler(e, notification._id)
															}
														>
															{isDeleting &&
															notificationID === notification._id ? (
																<i
																	className='fas fa-spinner fa-spin'
																	style={{ color: 'red' }}
																></i>
															) : (
																<FaTrash size={18} color={'red'} />
															)}
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className='container'>
									<p style={{ fontSize: '12px', marginTop: '1rem' }}>
										No notifications found.
									</p>
								</div>
							)}
						</TabPanel>
					</Tabs>
				) : (
					<EmptyPage
						header='No notifications found'
						para='Your notifications will be shown here'
					/>
				)}
			</div>
		</main>
	)
}

export default UserNotifications
