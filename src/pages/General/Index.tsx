import React, { useEffect } from 'react'
import '../../styles/index.css'
import HomeCarousel from '../../components/General/HomeCarousel'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import apartmentImg from '../../assets/picture.png'
import { getNearbyApartments } from '../../features/apartment/apartmentSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ApartmentSlider from '../../components/General/ApartmentSlider'

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

const Index = () => {
	const dispatch = useAppDispatch()

	const { nearbyApartments, isFetchingNearbyApartments } = useAppSelector(
		(state) => state.apartment
	)

	useEffect(() => {
		dispatch(getNearbyApartments())

		console.log('nearbyApartments', nearbyApartments)
	}, [dispatch])

	return (
		<>
			<main>
				<HomeCarousel />

				<section className='explore_apartments'>
					<PageHeaderComponent
						topHeader='EXPLORE'
						topHeaderColor='rgba(21, 94, 239, 0.8)'
						header='APARTMENTS NEAR YOU'
						link='/apartments-near-you'
						linkText='View all'
					/>
					<ApartmentSlider data={data} />
				</section>
			</main>
		</>
	)
}

export default Index
