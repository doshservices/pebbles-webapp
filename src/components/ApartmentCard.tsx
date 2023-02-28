import React from 'react'
import { Link } from 'react-router-dom'
import { comma } from '../utils/helper'
import SliderImages from './SliderImages'

const ApartmentCard = ({ apartmentInfo }: { apartmentInfo: any }) => {
	return (
		<div className='apartment_card'>
			<Link to='/'>
				<SliderImages images={apartmentInfo.images} />
				<div className='apartment_card_div'>
					<h6> {apartmentInfo.address} </h6>
					<p className='no_of_rooms' style={{ color: '#2d2d2d' }}>
						{apartmentInfo.no_of_rooms} bedroom apartment
					</p>
					<p className='amount'>
						<span>&#8358;{comma(apartmentInfo.amount)} </span> avg/night
					</p>
				</div>
			</Link>
		</div>
	)
}

export default ApartmentCard
