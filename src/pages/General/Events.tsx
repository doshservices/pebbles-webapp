import React, { useEffect, useLayoutEffect, useState } from 'react'
import EventCarousel from '../../components/General/EventCarousel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { get_events, reset } from '../../features/event/eventSlice'
import Loader from '../../components/Loader'
import SliderImages from '../../components/SliderImages'
import { Link } from 'react-router-dom'
import { comma } from '../../utils/helper'
import moment from 'moment'
import EmptyPage from '../../components/EmptyPage'

const Events = () => {
	const dispatch = useAppDispatch()

	const { events, isFetchingEvent } = useAppSelector((state) => state.event)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	useEffect(() => {
		dispatch(get_events())
		return () => {
			dispatch(reset())
		}
	}, [dispatch])

	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(12)
	const [loading, setLoading] = useState(false)

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = events?.slice(indexOfFirstPost, indexOfLastPost)

	const pageNumbers: number[] = []

	for (
		let i: number = 1;
		i <= Math.ceil(events ? events?.length / postsPerPage : 0);
		i++
	) {
		pageNumbers.push(i)
	}

	const setPage = (pageNum: number) => {
		setCurrentPage(pageNum)
	}

	return (
		<>
			<main className='events_page'>
				<EventCarousel />

				<div className='container' style={{ marginTop: '3rem' }}>
					<div className='row'>
						{isFetchingEvent ? (
							<Loader />
						) : events && events?.length > 0 ? (
							currentPosts?.map((item, index) => (
								<div className='col-lg-3 col-md-4 col-sm-6' key={index}>
									<div className='apartment_card event_card'>
										<Link to={`/events/${item._id}`}>
											<SliderImages images={item.eventImages} />
											<div className='apartment_card_div'>
												<h6>
													{item.eventName.length >= 50
														? item.eventName.substring(0, 50) + '...'
														: item.eventName}
												</h6>
												<p className='no_of_rooms' style={{ color: '#2d2d2d' }}>
													{moment(item.eventDate).format('ddd, MMMM DD')},{' '}
													{item.eventTime}
												</p>
												<p className='amount'>
													<span>&#8358;{comma(String(item.eventCost))}</span>
													/Ticket
												</p>
											</div>
										</Link>
									</div>
								</div>
							))
						) : (
							<EmptyPage
								header='No events found'
								para='Events will be shown here'
							/>
						)}
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
			</main>
		</>
	)
}

export default Events
