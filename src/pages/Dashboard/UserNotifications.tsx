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
										All Apartments ({notifications?.notifications?.length})
									</Tab>
									{/* <Tab>
										Available (
										{
											userApartments?.apartments?.filter(
												(item) => item.isAvailable
											).length
										}
										)
									</Tab>
									<Tab>
										{' '}
										Booked (
										{
											userApartments?.apartments?.filter(
												(item) => item.isAvailable === false
											).length
										}
										){' '}
									</Tab> */}
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
													{/* <td className='td_pad_top'>
														<Link
															to={`/notifications/${notification._id}`}
															className='link-dark'
														>
															<FaEye size={18} />
														</Link>
													</td> */}
													{/* <td className='td_pad_top'>
														<Link
															to={`/user/dashboard/listings/new/${notification._id}`}
															className='link-dark'
														>
															<FaPen size={18} />
														</Link>
													</td> */}
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
						{/* <TabPanel>
							{userApartments?.apartments?.filter((item) => item.isAvailable)
								.length > 0 ? (
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
											{userApartments?.apartments
												?.filter((item) => item.isAvailable)
												.map((apartment) => (
													<tr key={apartment._id}>
														<td>
															<SliderImages
																images={apartment?.featuredImages}
															/>
															<p className='apart_name'>
																{apartment.apartmentName}
															</p>
														</td>
														<td className='td_pad_top'>
															{apartment.typeOfApartment}
														</td>
														<td
															className='td_pad_top'
															style={{ width: '16rem' }}
														>
															{apartment.address}
														</td>
														<td
															className='td_pad_top'
															style={{ width: '20rem' }}
														>
															{apartment.facilities.map((item, index) => (
																<span key={index} style={{ paddingRight: 3 }}>
																	{item}
																	{index === apartment.facilities.length - 1
																		? '.'
																		: ','}
																</span>
															))}
														</td>

														<td className='td_pad_top'> {apartment.status} </td>
														<td className='td_pad_top'>
															<Link
																to={`/apartments/${apartment._id}`}
																className='link-dark'
															>
																<FaEye size={18} />
															</Link>
														</td>
														<td className='td_pad_top'>
															<Link
																to={`/user/dashboard/listings/new/${apartment._id}`}
																className='link-dark'
															>
																<FaPen size={18} />
															</Link>
														</td>
														<td className='td_pad_top'>
															<button
																className='border-none bg-white'
																style={{ border: 'none' }}
																onClick={(e) => deleteHandler(e, apartment._id)}
															>
																{isDeleting && apartmentID === apartment._id ? (
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
										No available apartments found
									</p>
								</div>
							)}
						</TabPanel> */}
					</Tabs>
				) : (
					<div className='container'>
						<p>No notifications found.</p>
					</div>
				)}
			</div>
		</main>
	)
}

export default UserNotifications
