import React from 'react'
import { Link } from 'react-router-dom'
import { ApartmentInterface } from '../features/apartment/apartmentState'
import { comma } from '../utils/helper'
import SliderImages from './SliderImages'

const ApartmentCard = ({
	apartmentInfo,
}: {
	apartmentInfo: ApartmentInterface
}) => {
	return (
		<div className='apartment_card'>
			<Link to={`/apartments/${apartmentInfo._id}`}>
				<SliderImages images={apartmentInfo.apartmentImages} />
				<div className='apartment_card_div'>
					<h6> {apartmentInfo.address} </h6>
					<p className='no_of_rooms' style={{ color: '#2d2d2d' }}>
						{apartmentInfo.numberOfBedrooms} bedroom apartment
					</p>
					<p className='amount'>
						<span>&#8358;{comma(String(apartmentInfo.price))} </span> avg/night
					</p>
				</div>
			</Link>
		</div>
	)
}

export default ApartmentCard
