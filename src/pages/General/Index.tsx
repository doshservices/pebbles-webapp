import React, { useEffect } from 'react'
import '../../styles/index.css'
import HomeCarousel from '../../components/General/HomeCarousel'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import {
	get_nearby_apartments,
	get_all_apartments,
	get_saved_apartments,
} from '../../features/apartment/apartmentSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import bgImage from '../../assets/carouselBackground1.png'
import lagos from '../../assets/lagos.png'
import ph from '../../assets/ph.png'
import ibadan from '../../assets/ibadan.png'
import abuja from '../../assets/abuja.png'
import enugu from '../../assets/enugu.png'
import { Link } from 'react-router-dom'
import ReviewSlider from '../../components/General/ReviewSlider'
import toast from 'react-hot-toast'

const reviewData = [
	{
		name: 'Muhammad',
		location: 'Lagos',
		message:
			'I recently used this website to find a new apartment and was very pleased with the results. The listing was detailed and accurate, and the landlord was very responsive.',
	},
	{
		name: 'Uduak',
		location: 'Port Harcourt',
		message:
			'I have been using this website for a few months now to find a new apartment and have been impressed with the selection of listings available.',
	},
	{
		name: 'Adebukola',
		location: 'Ibadan',
		message:
			'I recently rented an apartment through this website and it was a fantastic experience. I highly recommend this site for anyone searching for a new place to call home',
	},
	{
		name: 'Muhammad',
		location: 'Lagos',
		message:
			'I recently used this website to find a new apartment and was very pleased with the results. The listing was detailed and accurate, and the landlord was very responsive.',
	},
	{
		name: 'Uduak',
		location: 'Port Harcourt',
		message:
			'I have been using this website for a few months now to find a new apartment and have been impressed with the selection of listings available.',
	},
	{
		name: 'Adebukola',
		location: 'Ibadan',
		message:
			'I recently rented an apartment through this website and it was a fantastic experience. I highly recommend this site for anyone searching for a new place to call home',
	},
]

const Index = () => {
	const dispatch = useAppDispatch()

	const { nearbyApartments, allApartments, savedApartment } = useAppSelector(
		(state) => state.apartment
	)
	const { user_detail } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (user_detail) {
			toast.success('You are logged in.')

			dispatch(get_nearby_apartments())
			dispatch(get_all_apartments())
			dispatch(get_saved_apartments())
		} else {
			dispatch(get_all_apartments())
		}
	}, [dispatch, user_detail, savedApartment])

	return (
		<>
			<main>
				<HomeCarousel />

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
							{nearbyApartments &&
							nearbyApartments?.apartments.length > 0 ? (
								<ApartmentSlider
									data={
										nearbyApartments
											? nearbyApartments?.apartments
											: []
									}
								/>
							) : (
								<ApartmentSlider
									data={
										allApartments
											? allApartments?.apartments
											: []
									}
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
								data={
									allApartments &&
									allApartments?.apartments.length > 0
										? allApartments?.apartments
										: []
								}
							/>
						</>
					)}
				</section>

				<section
					style={{ backgroundImage: `url(${bgImage})` }}
					className='new_apartments'
				>
					<div className='container'>
						<h1> New Apartments Added Weekly </h1>

						<div
							className='row align-middle g-0 row-mobile gxc'
							style={{ padding: 0 }}
						>
							<div
								className='col'
								style={{
									marginRight: '15px',
									marginLeft: '15px',
								}}
							>
								<Link to='/'>
									<div>
										<img src={lagos} alt='' />
										<div className='bg-white'>
											<p className='text_black'>
												{' '}
												Lagos{' '}
											</p>
										</div>
									</div>
								</Link>
							</div>
							<div
								className='col'
								style={{
									marginRight: '15px',
									marginLeft: '15px',
								}}
							>
								<Link to='/'>
									<div>
										<img src={ph} alt='' />
										<div className='bg-white'>
											<p className='text_black'>
												{' '}
												Port Harcourt{' '}
											</p>
										</div>
									</div>
								</Link>
							</div>
							<div
								className='col'
								style={{
									marginRight: '15px',
									marginLeft: '15px',
								}}
							>
								<Link to='/'>
									<div>
										<img src={ibadan} alt='' />
										<div className='bg-white'>
											<p className='text_black'>
												{' '}
												Ibadan{' '}
											</p>
										</div>
									</div>
								</Link>
							</div>
							<div
								className='col'
								style={{
									marginRight: '15px',
									marginLeft: '15px',
								}}
							>
								<Link to='/'>
									<div>
										<img src={abuja} alt='' />
										<div className='bg-white'>
											<p className='text_black'>
												{' '}
												Abuja{' '}
											</p>
										</div>
									</div>
								</Link>
							</div>
							<div
								className='col'
								style={{
									marginRight: '15px',
									marginLeft: '15px',
								}}
							>
								<Link to='/'>
									<div>
										<img src={enugu} alt='' />
										<div className='bg-white'>
											<p className='text_black'>
												{' '}
												Enugu{' '}
											</p>
										</div>
									</div>
								</Link>
							</div>
						</div>

						<div className='text-center mt-5 pt-2'>
							<Link to='/all-apartments' className='explore'>
								Explore Destinations
							</Link>
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

				<section
					style={{ backgroundImage: `url(${bgImage})` }}
					className='new_apartments unlock_your'
				>
					<div className='container' style={{ position: 'relative' }}>
						<div className='row'>
							<div className='col-md-6'>
								<h1> Unlock Your Earning Potential Today </h1>

								<p>
									Open the door to endless possibilities and
									become a host today. Whether you have a
									spare room or a whole property, renting it
									out on our platform can bring in extra
									income and help you connect with people from
									all over the world.
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

				<section className='explore_apartments trendy_apartments pb-5'>
					<PageHeaderComponent
						topHeader='reviews'
						topHeaderColor='rgba(21, 94, 239, 0.8)'
						header='what others have to say'
						link=''
						linkText=''
					/>

					<ReviewSlider data={reviewData} />
				</section>
			</main>
		</>
	)
}

export default Index
