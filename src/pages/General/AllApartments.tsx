import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ApartmentCard from '../../components/ApartmentCard'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import Loader from '../../components/Loader'
import {
	apartmentReset,
	get_all_apartments,
	get_saved_apartments,
} from '../../features/apartment/apartmentSlice'
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
		<FaMapMarkerAlt size={18} color='red' />
		<div
			style={{
				padding: '0rem .2rem',
				backgroundColor: '#fff',
				display: 'inline-block',
			}}
		>
			<p style={{ fontSize: '16px', marginBottom: '0' }}>{text}</p>
		</div>
	</>
)

const AllApartments = () => {
	const dispatch = useAppDispatch()

	const { allApartments, isFetchingAllApartments, savedApartment } =
		useAppSelector((state) => state.apartment)

	const { user_detail } = useAppSelector((state) => state.auth)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	const [sortParams, setSortParams] = useState('')

	const defaultProps = {
		center: {
			lat: 6.565422,
			lng: 3.506448,
		},
		zoom: 11,
	}

	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(12)

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

	useEffect(() => {
		if (user_detail) {
			dispatch(get_saved_apartments())
		}
		dispatch(get_all_apartments())
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
					ALL APARTMENTS
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
							{isFetchingAllApartments ? (
								<Loader />
							) : allApartments && allApartments?.apartments.length > 0 ? (
								currentPosts?.map((item, index) => (
									<div className='col-md-3 col-sm-6' key={index}>
										<div key={index} className='p_4 mb-5'>
											<ApartmentCard apartmentInfo={item} />
										</div>
									</div>
								))
							) : (
								<EmptyPage
									header='No apartments found'
									para='All apartments will be shown here'
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
								{allApartments?.apartments?.map((item, index) => {
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
												key={index}
											/>
										)
									)
								})}
							</GoogleMapReact>
						</div>
					</div> */}
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
