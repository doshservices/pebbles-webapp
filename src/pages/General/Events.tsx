import React, { useEffect, useLayoutEffect } from 'react'
import EventCarousel from '../../components/General/EventCarousel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_events, reset } from '../../features/event/eventSlice'
import Loader from '../../components/Loader'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { comma } from '../../utils/helper'

const Events = () => {
	const dispatch = useAppDispatch()

	const { events, isFetchingEvent } = useAppSelector((state) => state.event)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	console.log('====================================')
	console.log('events', events)
	console.log('====================================')

	useEffect(() => {
		dispatch(get_events())
		return () => {
			dispatch(reset())
		}
	}, [dispatch])

	return (
		<>
			<main>
				<EventCarousel />

				<div className='container'>
					<div className='row'>
						{isFetchingEvent ? (
							<Loader />
						) : events && events?.length > 0 ? (
							events?.map((item, index) => (
								<div className='col-lg-3 col-md-4 col-sm-6' key={index}>
									<div className='apartment_card'>
										<Link to={`/events/${item._id}`}>
											<SliderImages images={item.eventImages} />
											<div className='apartment_card_div'>
												<h6>
													{item.eventName.length >= 50
														? item.eventName.substring(0, 50) + '...'
														: item.eventName}
												</h6>
												<p className='no_of_rooms' style={{ color: '#2d2d2d' }}>
													{item.eventLocation}
												</p>
												<p className='amount'>
													<span>&#8358;{comma(String(item.eventCost))} </span>
												</p>
											</div>
										</Link>
									</div>
								</div>
							))
						) : (
							<div className=''>
								<p> No events at the moment. </p>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default Events
