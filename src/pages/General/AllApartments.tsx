import React, { useLayoutEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import ApartmentCard from '../../components/ApartmentCard'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import Loader from '../../components/Loader'

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

const AllApartments = () => {
	const { allApartments, isFetchingAllApartments } = useAppSelector(
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

	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(12)
	const [loading, setLoading] = useState(false)

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = allApartments?.apartments?.slice(
		indexOfFirstPost,
		indexOfLastPost
	)

	const pageNumbers: number[] = []

	for (
		let i: number = 1;
		i <=
		Math.ceil(
			allApartments ? allApartments?.apartments?.length / postsPerPage : 0
		);
		i++
	) {
		pageNumbers.push(i)
	}

	const setPage = (pageNum: number) => {
		setCurrentPage(pageNum)
	}

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
					ALL APARTMENTS
				</h5>
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
							{isFetchingAllApartments ? (
								<Loader />
							) : allApartments && allApartments?.apartments.length > 0 ? (
								currentPosts?.map((item, index) => (
									<div className='col-md-4 col-sm-6' key={index}>
										<div key={index} className='p_4 mb-5'>
											<ApartmentCard apartmentInfo={item} />
										</div>
									</div>
								))
							) : (
								<div className='col-md-4 col-sm-6'>
									<div className='p_4 mb-5'>
										<p>No results found</p>
									</div>
								</div>
							)}
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

			{pageNumbers?.length > 1 && (
				<div className='my_paginate'>
					{pageNumbers.map((pageNum, index) => (
						<span
							key={index}
							className={pageNum === currentPage ? 'active' : ''}
							onClick={() => {
								setPage(pageNum)
							}}
						>
							{pageNum}
						</span>
					))}
				</div>
			)}
		</section>
	)
}

export default AllApartments
