import React, { useEffect, useLayoutEffect } from 'react'
import '../../styles/index.css'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import {
	get_nearby_apartments,
	get_all_apartments,
} from '../../features/apartment/apartmentSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import bgImage from '../../assets/Become_a_Host.jpg'
import { Link } from 'react-router-dom'
// import RideCarousel from '../../components/General/RideCarousel'
import LaundryCarousel from '../../components/General/LaundryCarousel'

const Laundry = () => {
	const dispatch = useAppDispatch()

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const { nearbyApartments, allApartments } = useAppSelector(
		(state) => state.apartment
	)
	const { user_detail } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (user_detail) {
			dispatch(get_nearby_apartments())
		} else {
			dispatch(get_all_apartments())
		}
	}, [dispatch, user_detail])

	return (
		<>
			<main>
				<LaundryCarousel />

				<section className='explore_apartments'>
					{user_detail ? (
						<>
							<PageHeaderComponent
								topHeader='EXPLORE'
								topHeaderColor='rgba(21, 94, 239, 0.8)'
								header='APARTMENTS NEAR YOU'
								link='/apartments-near-you'
								linkText='View all'
							/>
							{nearbyApartments && nearbyApartments?.apartments.length > 0 ? (
								<ApartmentSlider
									data={nearbyApartments ? nearbyApartments?.apartments : []}
								/>
							) : (
								<ApartmentSlider
									data={allApartments ? allApartments?.apartments : []}
								/>
							)}
						</>
					) : (
						<>
							<PageHeaderComponent
								topHeader='EXPLORE'
								topHeaderColor='rgba(21, 94, 239, 0.8)'
								header='OUR APARTMENTS'
								link='/all-apartments'
								linkText='View all'
							/>
							<ApartmentSlider
								data={allApartments ? allApartments?.apartments : []}
							/>
						</>
					)}
				</section>

				<section
					style={{
						backgroundImage: `url(${bgImage})`,
						backgroundSize: 'cover',
					}}
					className='new_apartments unlock_your'
				>
					<div className='container' style={{ position: 'relative' }}>
						<div className='row'>
							<div className='col-md-6'>
								<h1> Unlock Your Earning Potential Today </h1>

								<p>
									Open the door to endless possibilities and become a host
									today. Whether you have a spare room or a whole property,
									renting it out on our platform can bring in extra income and
									help you connect with people from all over the world.
								</p>

								<div className='mt-4 pt-2'>
									<Link to='/' className='explore'>
										Become a Host
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='explore_apartments trendy_apartments'>
					<PageHeaderComponent
						topHeader='FEATURED'
						topHeaderColor='rgba(21, 94, 239, 0.8)'
						header='MOST TRENDY APARTMENTS'
						link='/all-apartments'
						linkText='View all'
					/>
					<ApartmentSlider
						data={allApartments ? allApartments?.apartments : []}
					/>
				</section>
			</main>
		</>
	)
}

export default Laundry
