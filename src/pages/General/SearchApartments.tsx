import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import ApartmentCard from '../../components/ApartmentCard'
import apartmentImg from '../../assets/picture.png'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'

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
	// const { searchApartments, isFetchingSearchApartments } = useAppSelector(
	// 	(state) => state.apartment
	// )

	const [sortParams, setSortParams] = useState('')

	const defaultProps = {
		center: {
			lat: 6.465422,
			lng: 3.406448,
		},
		zoom: 11,
	}

	return (
		<section className='search_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-8'>
						<div className='sort_div'>
							{/* <p style={{ marginBottom: '0' }}>
								10 Apartment found in Surulere
							</p> */}

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
							{data.map((item, index) => (
								<div className='col-md-4 col-sm-6' key={index}>
									<div key={index} className='p_4 mb-5'>
										<ApartmentCard apartmentInfo={item} />
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='col-lg-4 map_section'>
						<div style={{ height: '30rem', width: '100%' }}>
							<GoogleMapReact
								bootstrapURLKeys={{
									key: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
								}}
								defaultCenter={defaultProps.center}
								defaultZoom={defaultProps.zoom}
							>
								<AnyReactComponent
									lat={6.465422}
									lng={3.406448}
									text='My Marker'
								/>
							</GoogleMapReact>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SearchApartments
