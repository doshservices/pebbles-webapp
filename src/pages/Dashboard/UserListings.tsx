import React, { useEffect } from 'react'
import building from '../../assets/building.png'
import SliderImages from '../../components/SliderImages'
import apartmentImg from '../../assets/picture.png'
import { Link } from 'react-router-dom'
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../components/Loader'
import { get_apartments_by_user } from '../../features/apartment/apartmentSlice'

const UserListings = () => {
	const dispatch = useAppDispatch()

	const { userApartments, isFetchingAllApartments } = useAppSelector(
		(state) => state.apartment
	)

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

	const data = [
		{
			type: 'Mansion',
			id: 1,
			name: "Favour's Mansion",
			status: 'pending',
			amenities:
				'24hrs Power Supply, Fast Wi-Fi, LED TV, AC,Heater, Gym, Pool, Kitchen, Pet-friendly, CCTV.',
			location: 'Surulere',
			date: 'Feb 10 - 27',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			type: 'Mansion',
			id: 2,
			name: "Favour's Mansion",
			status: 'active',
			amenities:
				'24hrs Power Supply, Fast Wi-Fi, LED TV, AC,Heater, Gym, Pool, Kitchen, Pet-friendly, CCTV.',
			location: 'Surulere',
			date: 'Feb 10 - 27',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			type: 'Mansion',
			id: 3,
			name: "Favour's Mansion",
			status: 'closed',
			amenities:
				'24hrs Power Supply, Fast Wi-Fi, LED TV, AC,Heater, Gym, Pool, Kitchen, Pet-friendly, CCTV.',
			location: 'Surulere',
			date: 'Feb 10 - 27',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			type: 'Mansion',
			id: 4,
			name: "Favour's Mansion",
			status: 'closed',
			amenities:
				'24hrs Power Supply, Fast Wi-Fi, LED TV, AC,Heater, Gym, Pool, Kitchen, Pet-friendly, CCTV.',
			location: 'Surulere',
			date: 'Feb 10 - 27',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			type: 'Mansion',
			id: 5,
			name: "Favour's Mansion",
			status: 'closed',
			amenities:
				'24hrs Power Supply, Fast Wi-Fi, LED TV, AC,Heater, Gym, Pool, Kitchen, Pet-friendly, CCTV.',
			location: 'Surulere',
			date: 'Feb 10 - 27',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
	]

	const deleteHandler = async (e, obj) => {
		e.preventDefault()
	}

	console.log('====================================')
	console.log('userApartments', userApartments)
	console.log('====================================')

	useEffect(() => {
		dispatch(get_apartments_by_user())
	}, [dispatch])

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
									<Tab> All Apartments (30) </Tab>
									<Tab> Available (10) </Tab>
									<Tab> Booked (20) </Tab>
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
							{data?.length > 0 ? (
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
													<td className='td_pad_top'>{apartment.address}</td>
													<td className='td_pad_top' style={{ width: '20rem' }}>
														{apartment.facilities.map((item, index) => (
															<span style={{ paddingRight: 3 }}>
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
														<a
															href='#/'
															className='me-3 link-dark'
															onClick={(e) => deleteHandler(e, apartment)}
														>
															<FaTrash size={18} color={'red'} />
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : null}
						</TabPanel>
						<TabPanel>
							<h2>Any content 2</h2>
						</TabPanel>
						<TabPanel>
							<h2>Any content 3</h2>
						</TabPanel>
					</Tabs>
				) : (
					<div className='container'>
						<p>No apartment listing found.</p>
					</div>
				)}
			</div>
		</main>
	)
}

export default UserListings
