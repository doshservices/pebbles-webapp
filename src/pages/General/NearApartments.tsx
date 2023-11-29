import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ApartmentCard from '../../components/ApartmentCard'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import Loader from '../../components/Loader'
import {
	apartmentReset,
	get_nearby_apartments,
	get_saved_apartments,
} from '../../features/apartment/apartmentSlice'
import EmptyPage from '../../components/EmptyPage'

const NearApartments = () => {
	const dispatch = useAppDispatch()

	const { nearbyApartments, isFetchingNearbyApartments, savedApartment } =
		useAppSelector((state) => state.apartment)

	const { user_detail } = useAppSelector((state) => state.auth)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const [sortParams, setSortParams] = useState('')

	useEffect(() => {
		if (user_detail) {
			dispatch(get_nearby_apartments())
			dispatch(get_saved_apartments())
		}
		return () => {
			dispatch(apartmentReset())
		}
	}, [dispatch, user_detail, savedApartment])

	return (
		<section className='search_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>
			<div className='container'>
				<h5
					style={{
						fontWeight: '700',
						marginTop: '-1rem',
						marginBottom: '2rem',
					}}
				>
					APARTMENTS NEAR YOU
				</h5>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='sort_div'>
							<div
								className='d-flex'
								style={{ alignItems: 'center', justifyContent: 'center' }}
							>
								<p style={{ width: '5rem', marginBottom: '0' }}>Sort by</p>
								<select
									onChange={(e) => {
										setSortParams(e.target.value)
									}}
									className='form-control form-select form-input'
								>
									<option value='Most Popular'>Most Popular</option>
									<option value='Rating'>Rating</option>
									<option value='Price (Low to High)'>
										Price (Low to High)
									</option>
									<option value='Price (High to Low)'>
										Price (High to Low)
									</option>
								</select>
							</div>
						</div>
						<div className='row'>
							{isFetchingNearbyApartments ? (
								<Loader />
							) : nearbyApartments &&
							  nearbyApartments?.apartments?.length > 0 ? (
								nearbyApartments?.apartments?.map((item, index) => (
									<div className='col-md-3 col-sm-6' key={index}>
										<div key={index} className='p_4 mb-5'>
											<ApartmentCard apartmentInfo={item} />
										</div>
									</div>
								))
							) : (
								<EmptyPage
									header='No apartments found'
									para='Nearby apartments will be shown here'
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default NearApartments
