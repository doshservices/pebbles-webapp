import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect } from 'react'
import ApartmentCard from '../../components/ApartmentCard'
import Loader from '../../components/Loader'
import { get_saved_apartments } from '../../features/apartment/apartmentSlice'

const UserWishlist = () => {
	const dispatch = useAppDispatch()

	const { isSavingApartment, savedApartments } = useAppSelector(
		(state) => state.apartment
	)

	useEffect(() => {
		dispatch(get_saved_apartments())
	}, [dispatch])

	return (
		<main className='dashboard search_page'>
			<div className='mb-5'>
				<h6> My Saves </h6>
			</div>
			<div className='row justify-content-center'>
				<div className='col-md-11'>
					<div className='row'>
						{isSavingApartment ? (
							<Loader />
						) : savedApartments && savedApartments.apartment?.length > 0 ? (
							savedApartments.apartment?.map((item, index) => (
								<div className='col-lg-4 col-md-4 col-sm-6' key={index}>
									<div key={index} className='p_4 mb-5'>
										<ApartmentCard
											apartmentInfo={item?.apartmentId}
											showfalse={false}
										/>
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
