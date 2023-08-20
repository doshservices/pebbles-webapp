import React, { useLayoutEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import ApartmentCard from '../../components/ApartmentCard'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import Loader from '../../components/Loader'
import EmptyPage from '../../components/EmptyPage'

const AnyReactComponent = ({
	text,
	lat,
	lng,
}: {
	text: any
	lat: number
	lng: number
}) => (
	<>
		<FaMapMarkerAlt size={28} color='red' />
		{/* <div>{text}</div> */}
	</>
)

const SearchApartments = () => {
	const { searchApartments, isFetchingSearchApartments } = useAppSelector(
		(state) => state.apartment
	)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const [sortParams, setSortParams] = useState('')

	const defaultProps = {
		center: {
			lat: 6.465422,
			lng: 3.406448,
		},
		zoom: 11,
	}

	console.log('====================================')
	console.log('searchApartments', searchApartments)
	console.log('====================================')

	return (
		<section className='search_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='sort_div'>
							<h5
								style={{
									fontWeight: '700',
									marginTop: '-1rem',
									marginBottom: '2rem',
								}}
							>
								{searchApartments && searchApartments?.apartments?.length > 0
									? searchApartments?.apartments?.length
									: '0'}{' '}
								Apartment
								{searchApartments && searchApartments?.apartments?.length === 1
									? ''
									: 's'}{' '}
								found
							</h5>

							<div
								className='d-flex'
								style={{ alignItems: 'center', justifyContent: 'center' }}
							>
								<p
									style={{
										width: '5rem',
										marginBottom: '0',
										marginRight: '1rem',
									}}
								>
									Sort by
								</p>
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
							{isFetchingSearchApartments ? (
								<Loader />
							) : searchApartments &&
							  searchApartments.apartments?.length > 0 ? (
								searchApartments.apartments.map((item, index) => (
									<div className='col-md-3 col-sm-6' key={index}>
										<div key={index} className='p_4 mb-5'>
											<ApartmentCard apartmentInfo={item} />
										</div>
									</div>
								))
							) : (
								<EmptyPage
									header='No apartment found'
									para='Try modifying your search by changing your dates or removing filters.'
								/>
							)}
						</div>
					</div>
					{/* <div className='col-lg-4 map_section'>
						<div style={{ height: '30rem', width: '100%' }}>
							<GoogleMapReact
								bootstrapURLKeys={{
									key: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
								}}
								defaultCenter={defaultProps.center}
								defaultZoom={defaultProps.zoom}
							>
								{searchApartments?.apartments?.map((item) => {
									return (
										item?.latitude &&
										item?.latitude !== 'undefined' &&
										item?.latitude !== 'latitude' &&
										item?.longitude &&
										item?.longitude !== 'undefined' &&
										item?.longitude !== 'longitude' && (
											<AnyReactComponent
												lat={Number(item?.latitude)}
												lng={Number(item?.longitude)}
												text={item.apartmentName}
											/>
										)
									)
								})}
							</GoogleMapReact>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	)
}

export default SearchApartments
