import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { useEffect, useState } from 'react'
import ApartmentCard from '../../components/ApartmentCard'
import Loader from '../../components/Loader'

const UserWishlist = () => {
	// const dispatch = useAppDispatch()
	const { isFetchingAllApartments, allApartments } = useAppSelector(
		(state) => state.apartment
	)

	// useEffect(() => {}, [])

	return (
		<main className='dashboard search_page'>
			<div className='mb-5'>
				<h6> My Saves </h6>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-11'>
					<div className='row'>
						{isFetchingAllApartments ? (
							<Loader />
						) : allApartments && allApartments.apartments?.length > 0 ? (
							allApartments.apartments.map((item, index) => (
								<div className='col-lg-4 col-md-4 col-sm-6' key={index}>
									<div key={index} className='p_4 mb-5'>
										<ApartmentCard apartmentInfo={item} />
									</div>
								</div>
							))
						) : (
							<div className='col-12'>
								<div className='p_4 mb-5'>
									<p>No results found</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserWishlist
