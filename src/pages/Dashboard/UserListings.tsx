import React, { useEffect, useMemo, useState } from 'react'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../components/Loader'
import {
	delete_apartment,
	get_apartments_by_user,
} from '../../features/apartment/apartmentSlice'

const UserListings = () => {
	const dispatch = useAppDispatch()

	const { userApartments, isFetchingAllApartments, isDeleting, deleteSuccess } =
		useAppSelector((state) => state.apartment)

	const [apartmentID, setApartmentID] = useState('')

	const tableHeaders = [
		'Apartment name',
		'Apartment Type',
		'Location',
		'Amenities',
		'Status',
		'View',
		'Edit',
		'Action',
	]

	useMemo(
		() => dispatch(get_apartments_by_user()),
		[dispatch, userApartments?.apartments?.length]
	)

	const deleteHandler = async (e: any, string: string) => {
		e.preventDefault()
		setApartmentID(string)
		dispatch(delete_apartment({ id: string }))
	}

	useEffect(() => {
		dispatch(get_apartments_by_user())
	}, [dispatch, deleteSuccess])

	return (
		<main className='dashboard dashboard_bookings dashboard_listings'>
			<div>
				{isFetchingAllApartments ? (
					<Loader />
				) : userApartments && userApartments?.apartments?.length > 0 ? (
					<Tabs>
						<div className='row'>
							<div className='col-md-6 col-sm-8 '>
								<TabList className='d-flex justify-content-between roww'>
									<Tab>
										All Apartments ({userApartments?.apartments?.length})
									</Tab>
									<Tab>
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
									</Tab>
								</TabList>
							</div>
							<div className='col-md-6 col-sm-4'>
								<div className='text-end add_new_row'>
									<Link
										to='/user/dashboard/listings/new'
										className='add_new_btn'
									>
										<FaPlus
											className='me-2'
											style={{ marginBottom: '.2rem' }}
											size={11}
										/>{' '}
										Add New
									</Link>
								</div>
							</div>
						</div>

						<TabPanel>
							{userApartments?.apartments?.length > 0 ? (
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
											{userApartments?.apartments?.map((apartment) => (
												<tr key={apartment._id}>
													<td>
														<SliderImages images={apartment?.featuredImages} />
														<p className='apart_name'>
															{apartment.apartmentName}
														</p>
													</td>
													<td className='td_pad_top'>
														{apartment.typeOfApartment}
													</td>
													<td className='td_pad_top' style={{ width: '16rem' }}>
														{apartment.address}
													</td>
													<td className='td_pad_top' style={{ width: '20rem' }}>
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
															<div className='tooltipp'>
																<FaEye size={18} color='#000' />

																<span className='tooltipptext'>
																	View Details
																</span>
															</div>
														</Link>
													</td>
													<td className='td_pad_top'>
														<Link
															to={`/user/dashboard/listings/new/${apartment._id}`}
															className='link-dark'
														>
															<div className='tooltipp'>
																<FaPen size={18} color='#000' />

																<span className='tooltipptext'>
																	Edit Details
																</span>
															</div>
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
																<div className='tooltipp'>
																	<FaTrash size={18} color={'red'} />

																	<span className='tooltipptext'>Delete</span>
																</div>
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
										No apartments found
									</p>
								</div>
							)}
						</TabPanel>
						<TabPanel>
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
						</TabPanel>
						<TabPanel>
							{userApartments?.apartments?.filter(
								(item) => item.isAvailable === false
							).length > 0 ? (
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
												?.filter((item) => item.isAvailable === false)
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
																<div className='tooltipp'>
																	<FaEye size={18} color='#000' />

																	<span className='tooltipptext'>
																		View Details
																	</span>
																</div>
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
										No booked apartments found
									</p>
								</div>
							)}
						</TabPanel>
					</Tabs>
				) : (
					<div className='container'>
						<div className='text-end add_new_row'>
							<Link to='/user/dashboard/listings/new' className='add_new_btn'>
								<FaPlus
									className='me-2'
									style={{ marginBottom: '.2rem' }}
									size={11}
								/>{' '}
								Add New
							</Link>
						</div>
						<p>No apartment listing found.</p>
					</div>
				)}
			</div>
		</main>
	)
}

export default UserListings
