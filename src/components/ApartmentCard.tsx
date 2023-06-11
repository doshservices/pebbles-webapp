import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { ApartmentInterface } from '../features/apartment/apartmentState'
import { comma } from '../utils/helper'
import SliderImages from './SliderImages'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import white_heart from '../assets/white_heart.png'
import blue_heart from '../assets/blue_heart.png'
import { save_apartment } from '../features/apartment/apartmentSlice'

const ApartmentCard = ({
	apartmentInfo,
	showfalse = true,
}: {
	apartmentInfo: ApartmentInterface
	showfalse?: boolean
}) => {
	const dispatch = useAppDispatch()

	const { user_detail } = useAppSelector((state) => state.auth)

	const { savedApartments, isSavingApartment } = useAppSelector(
		(state) => state.apartment
	)

	const saveHandler = (e: any, id: string) => {
		e.preventDefault()
		dispatch(save_apartment({ apartmentId: id }))
	}

	return (
		<div className='apartment_card'>
			<Link to={`/apartments/${apartmentInfo?._id}`}>
				<div className='apartment_card_img_div'>
					<SliderImages images={apartmentInfo?.featuredImages} />
				</div>
				<div className='apartment_card_div'>
					<div className='row'>
						<div className='col-10'>
							<h6>
								{apartmentInfo?.address.length >= 50
									? apartmentInfo?.address.substring(0, 50) + '...'
									: apartmentInfo?.address}
							</h6>
							<p className='no_of_rooms' style={{ color: '#2d2d2d' }}>
								{apartmentInfo?.numberOfBedrooms} bedroom apartment
							</p>
							<p className='amount'>
								<span>&#8358;{comma(String(apartmentInfo?.price))} </span>{' '}
								avg/night
							</p>
						</div>
						<div className='col-2'>
							{user_detail && showfalse ? (
								<>
									{savedApartments?.apartment?.find(
										(item) => item.apartmentId._id === apartmentInfo?._id
									) ? (
										<img
											onClick={(e) => saveHandler(e, apartmentInfo?._id)}
											src={blue_heart}
											alt=''
											style={{
												height: '1.5rem',
												width: '1.5rem',
												objectFit: 'contain',
											}}
										/>
									) : (
										<img
											onClick={(e) => saveHandler(e, apartmentInfo?._id)}
											src={white_heart}
											alt=''
											className={isSavingApartment ? 'rotating_heart' : ''}
											style={{
												height: '1.5rem',
												width: '1.5rem',
												objectFit: 'contain',
											}}
										/>
									)}
								</>
							) : null}
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default ApartmentCard
