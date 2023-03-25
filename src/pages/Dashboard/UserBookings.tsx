import React from 'react'
import building from '../../assets/building.png'
import SliderImages from '../../components/SliderImages'
import apartmentImg from '../../assets/picture.png'
import { Link } from 'react-router-dom'

const UserBookings = () => {
	const tableHeaders = [
		'Apartment name',
		'Apartment Type',
		'Location',
		'Amenities',
		'Booked Date',
		'Status',
		'View',
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
		console.log('====================================')
		console.log(obj)
		console.log('====================================')
	}

	return (
		<main className='dashboard dashboard_bookings'>
			<div>
				<h6>Booking History</h6>
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
								{data.map((booking) => (
									<tr key={booking.id}>
										<td>
											<SliderImages images={booking.images} />
											<p className='apart_name'>{booking.name}</p>
										</td>
										<td className='td_pad_top'>{booking.type}</td>
										<td className='td_pad_top'>{booking.location}</td>
										<td className='td_pad_top' style={{ width: '20rem' }}>
											{' '}
											{booking.amenities}{' '}
										</td>
										<td className='td_pad_top'> {booking.date} </td>
										<td className='td_pad_top'> {booking.status} </td>
										<td className='td_pad_top'>
											<Link
												to={`/user/dashboard/my-bookings/${booking.id}`}
												className='link-dark'
											>
												{/* <GrFormView size={18} /> */}
												Details
											</Link>
										</td>
										<td className='td_pad_top'>
											<a
												href='#/'
												className='me-3 link-dark'
												onClick={(e) => deleteHandler(e, booking)}
											>
												{/* <AiFillEdit size={18} /> */}
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : null}
			</div>
		</main>
	)
}

export default UserBookings
