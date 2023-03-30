import React from 'react'
import apartmentImg from '../../assets/picture.png'
import ApartmentCard from '../../components/ApartmentCard'

const UserWishlist = () => {
	const data = [
		{
			address: 'Surulere, Lagos, Nigeria',
			no_of_rooms: 5,
			amount: '12000',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			address: 'Ogba, Lagos, Nigeria',
			no_of_rooms: 5,
			amount: '12000',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			address: 'Surulere, Lagos, Nigeria',
			no_of_rooms: 5,
			amount: '12000',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			address: 'Ogba, Lagos, Nigeria',
			no_of_rooms: 5,
			amount: '12000',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
		{
			address: 'Surulere, Lagos, Nigeria',
			no_of_rooms: 5,
			amount: '12000',
			images: [apartmentImg, apartmentImg, apartmentImg],
		},
	]

	return (
		<main className='dashboard search_page'>
			<div>
				<h6> My Saves </h6>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-10'>
					<div className='row'>
						{data.map((item, index) => (
							<div className='col-md-4 col-sm-6' key={index}>
								<div key={index} className='p_4 mb-5'>
									{/* <ApartmentCard apartmentInfo={item} /> */}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserWishlist
