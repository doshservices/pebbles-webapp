import React from 'react'
import { comma } from '../utils/helper'
import SliderImages from './SliderImages'

const ApartmentCard = ({ apartmentInfo }: { apartmentInfo: any }) => {
	return (
		<div className='apartment_card'>
			<SliderImages images={apartmentInfo.images} />
			<div className='apartment_card_div'>
				<h6> {apartmentInfo.address} </h6>
				<p className='no_of_rooms'>
					{apartmentInfo.no_of_rooms} bedroom apartment
				</p>
				<p className='amount'>
					<span>&#8358;{comma(apartmentInfo.amount)} </span> avg/night
				</p>
			</div>
		</div>
	)
}

export default ApartmentCard
