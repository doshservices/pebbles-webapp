import React, { useEffect, useLayoutEffect, useState } from 'react'
// import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { comma } from '../../utils/helper'
import // AiOutlineWifi,
// AiOutlineStop,
// AiOutlineClockCircle,
'react-icons/ai'
// import { HiOutlineLightBulb } from 'react-icons/hi'
// import { MdOutlinePool, MdOutlinePayments } from 'react-icons/md'
// import { SlScreenDesktop } from 'react-icons/sl'
// import { CgGym } from 'react-icons/cg'
// import { TbMessageReport, TbDisabled } from 'react-icons/tb'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
	flutter_pay_event,
	get_event_by_id,
	reset,
} from '../../features/event/eventSlice'
import Loader from '../../components/Loader'
import { toast } from 'react-hot-toast'
import ModalComponent from '../../components/ModalComponent'
import moment from 'moment'
import {
	get_all_apartments,
	get_nearby_apartments,
} from '../../features/apartment/apartmentSlice'

const EventDetails = () => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const { user_detail } = useAppSelector((state) => state.auth)
	const { event, isFetchingEvent } = useAppSelector((state) => state.event)
	const { apartment, allApartments, nearbyApartments } = useAppSelector(
		(state) => state.apartment
	)

	console.log('====================================')
	console.log('event', event)
	console.log('====================================')

	const [photoIndex, setPhotoIndex] = useState<number>(0)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [ticket, setTicket] = useState<string>('1')
	const [availability, setAvailability] = useState<string[]>([])
	const [openModal, setOpenModal] = useState(false)

	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	useEffect(() => {
		dispatch(get_event_by_id({ id: params?.id }))
		dispatch(get_all_apartments())
		dispatch(get_nearby_apartments())

		let data = {
			eventId: params?.id,
			paymentMethod: 'FLUTTERWAVE',
		}

		dispatch(flutter_pay_event(data))

		return () => {
			dispatch(reset())
		}
	}, [params?.id, dispatch])

	return (
		<main className='apartment_details_page page_padding'>
			{isFetchingEvent ? (
				<Loader />
			) : event ? (
				<div className='container mt-5'>
					<div style={{ position: 'relative' }}>
						<div className='row mb-4'>
							<div className='col-md-12'>
								<img
									src={event?.eventImages[0]}
									alt=''
									className='intro_image intro_full'
								/>
							</div>
						</div>

						<button className='lightbox_btn' onClick={() => setIsOpen(true)}>
							VIEW {event?.eventImages?.length} PHOTOS
						</button>
						{isOpen && (
							<Lightbox
								mainSrc={event?.eventImages[photoIndex]}
								nextSrc={
									event?.eventImages[
										(photoIndex + 1) % event?.eventImages.length
									]
								}
								prevSrc={
									event?.eventImages[
										(photoIndex + event?.eventImages.length - 1) %
											event?.eventImages.length
									]
								}
								onCloseRequest={() => setIsOpen(false)}
								onMovePrevRequest={() =>
									setPhotoIndex(
										(photoIndex + event?.eventImages.length - 1) %
											event?.eventImages.length
									)
								}
								onMoveNextRequest={() =>
									setPhotoIndex((photoIndex + 1) % event?.eventImages.length)
								}
								imagePadding={100}
							/>
						)}
					</div>

					<div>
						<div className='row'>
							<div className='col-md-7'>
								<div>
									<h3 className='intro_header'> {event?.eventName} </h3>
									<p className='intro_para'>{event?.description}</p>
								</div>
							</div>
							<div className='col-lg-5 col-md-5'>
								<div className='apartment_formform_pad'>
									<div className='apartment_formform'>
										<div className='row'>
											<div className='col-md-12'>
												<form
													action=''
													style={{
														borderBottom: '1px solid rgba(45, 45, 45, 0.2)',
														marginBottom: '1rem',
													}}
												>
													<div className='apartment_formform_div'>
														<div className='row g-0'>
															<div className='col-md-12'>
																<div className='p-2'>
																	<input
																		type='number'
																		placeholder='No. of Tickets'
																		className='form-control'
																		onChange={(e) => setTicket(e.target.value)}
																		required
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className='text-center'>
														<button
															className='btn form-control btn_save'
															// disabled={isCreatingBooking}
														>
															Book Now
														</button>
													</div>
												</form>
											</div>
											<div className='sect3'>
												<div className='d-flex justify-content-between'>
													<p>Tickets</p>
													<p> {ticket} </p>
												</div>
												<div className='d-flex justify-content-between'>
													<p>Base Ticket Price</p>
													<p> &#8358;{comma(String(event.eventCost))} </p>
												</div>
												<div className='d-flex justify-content-between'>
													<p> Total </p>
													<p>
														&#8358;
														{comma(String(event.eventCost * Number(ticket)))}
													</p>
												</div>
											</div>

											{user_detail ? (
												<div className='col-12 pb-4'>
													<p>Please proceed to make payment.</p>
													<Link
														to={`/user/dashboard/my-bookings`}
														className='btn btn-info text-white'
													>
														Proceed
													</Link>
												</div>
											) : (
												<div className='col-12 pb-4'>
													<p>
														Please you have to have an account and be logged in
														to proceed with payment.
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='container'>
					<p>Apartment not found.</p>
				</div>
			)}

			<div className='grey_bg'>
				<div className='container'>
					<h5> Stil have questions? </h5>
					<p className='intro_para mb-0 pb-0'>
						For all stays less than 90 nights, call our team on +234 701 234
						5678 or email us at info@pebbles-signature.coms
					</p>
					<p className='intro_para mt-0'>
						For stays longer than 90 nights, email our sales team at
						sales@pebbles-signature.com.
					</p>
				</div>
			</div>

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
						{nearbyApartments && nearbyApartments?.apartments.length > 0 ? (
							<ApartmentSlider
								data={nearbyApartments ? nearbyApartments?.apartments : []}
							/>
						) : (
							<ApartmentSlider
								data={allApartments ? allApartments?.apartments : []}
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
							data={allApartments ? allApartments?.apartments : []}
						/>
					</>
				)}
			</section>
			<ModalComponent
				open={openModal}
				toggle={() => setOpenModal(false)}
				title='Booked Dates'
			>
				<div className='container'>
					<ul>
						{availability.map((item, index) => (
							<li style={{ fontSize: '14px' }} key={index}>
								{moment(item).format('MMMM Do, YYYY')}
							</li>
						))}
					</ul>
				</div>
			</ModalComponent>
		</main>
	)
}

export default EventDetails
