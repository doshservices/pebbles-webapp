import React, { useEffect, useState } from 'react'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import bgImage from '../../assets/carouselBackground1.png'
import bgImage2 from '../../assets/Registration1.jpg'
import { Link } from 'react-router-dom'
import { comma } from '../../utils/helper'
import { FaSnowflake } from 'react-icons/fa'
import {
	AiOutlineWifi,
	AiOutlineStop,
	AiOutlineClockCircle,
} from 'react-icons/ai'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePool, MdOutlinePayments } from 'react-icons/md'
import { SlScreenDesktop } from 'react-icons/sl'
import { CgGym } from 'react-icons/cg'
import { TbMessageReport, TbDisabled } from 'react-icons/tb'
import PageHeaderComponent from '../../components/General/PageHeaderComponent'
import abuja from '../../assets/abuja.png'
import two_users from '../../assets/two_users.png'
import ApartmentSlider from '../../components/General/ApartmentSlider'
import apartmentImg from '../../assets/picture.png'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

const ApartmentDetails = () => {
	const pressHandler = () => {}

	const [limitValue, setLimitValue] = useState<number>(3)
	const [limit, setLimit] = useState<boolean>(false)
	const [photoIndex, setPhotoIndex] = useState<number>(0)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const images = [bgImage, bgImage2]

	const amenities: string[] = [
		'24hrs Power Supply',
		'Air conditioning',
		'Fast Wi-Fi',
		'Swimming pool',
		'TV with Netflix, Amazon and Julu',
		'Fitness Gym',
	]

	const toggleMore = () => {
		setLimit(!limit)
		if (limit) {
			setLimitValue(amenities?.length - 1)
		} else {
			setLimitValue(3)
		}
	}

	const landmarks = [
		{
			image: abuja,
			name: 'Teslim Balogun Stadium',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Costain Plc',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Costain Plc',
			distance: '10',
		},
		{
			image: abuja,
			name: 'Teslim Balogun Stadium',
			distance: '10',
		},
	]

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

	useEffect(() => {}, [limitValue, limit])

	return (
		<main className='apartment_details_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>

			<div className='container'>
				<div style={{ position: 'relative' }}>
					<div className='row mb-4'>
						<div className='col-md-7'>
							<img src={bgImage} alt='' className='intro_image intro_full' />
						</div>
						<div className='col-md-5'>
							<div style={{ marginBottom: '1.5rem' }}>
								<img src={bgImage} alt='' className='intro_image intro_half' />
							</div>
							<div>
								<img src={bgImage2} alt='' className='intro_image intro_half' />
							</div>
						</div>
					</div>

					<button className='lightbox_btn' onClick={() => setIsOpen(true)}>
						VIEW 10 PHOTOS
					</button>
					{isOpen && (
						<Lightbox
							mainSrc={images[photoIndex]}
							nextSrc={images[(photoIndex + 1) % images.length]}
							prevSrc={images[(photoIndex + images.length - 1) % images.length]}
							onCloseRequest={() => setIsOpen(false)}
							onMovePrevRequest={() =>
								setPhotoIndex((photoIndex + images.length - 1) % images.length)
							}
							onMoveNextRequest={() =>
								setPhotoIndex((photoIndex + 1) % images.length)
							}
							imagePadding={100}
						/>
					)}
				</div>

				<div>
					<div className='row'>
						<div className='col-md-7'>
							<div>
								<h3 className='intro_header'>3 Bedroom Detached Duplex</h3>
								<p className='intro_para'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum
								</p>
							</div>

							<div
								style={{
									borderBottom: '1.14691px solid rgba(45, 45, 45, 0.2)',
									paddingBottom: '2rem',
								}}
							>
								<h2 className='sect_head'>HOUSE DETAILS</h2>
								<h5 className='mb-3'>Available Amenities</h5>

								<div className='row'>
									{amenities.map((item, index) => (
										<>
											{index <= limitValue ? (
												<div className='col-md-6 col-sm-6' key={index}>
													<div className='d-flex amenities_div'>
														{item === '24hrs Power Supply' ? (
															<HiOutlineLightBulb size={22} />
														) : item === 'Air conditioning' ? (
															<FaSnowflake size={22} />
														) : item === 'Fast Wi-Fi' ? (
															<AiOutlineWifi size={22} />
														) : item === 'Swimming pool' ? (
															<MdOutlinePool size={22} />
														) : item === 'TV with Netflix, Amazon and Julu' ? (
															<SlScreenDesktop size={22} />
														) : (
															<CgGym size={24} />
														)}
														<p> {item} </p>
													</div>
												</div>
											) : null}
										</>
									))}
								</div>

								<button
									onClick={() => toggleMore()}
									className='btn btn-primary mt-3  btn_white_blue'
								>
									Show all 20 Amenities
								</button>
							</div>

							<div
								style={{
									borderBottom: '1.14691px solid rgba(45, 45, 45, 0.2)',
									paddingBottom: '2rem',
								}}
							>
								<h5 className='pt-4 mb-0'>Neighbourhood</h5>
								<p className='intro_para mb-0'>
									Surulere is a residential and commercial Local Government Area
									located on the mainland of Lagos in Lagos State, Nigeria, with
									an area of 23 km2 (8.9 sq mi). The local government area is
									bordered by Yaba, Mushin and Ebute-Metta. It is home to the
									Lagos National Stadium (capacity 60,000) built in 1972 for the
									All-Africa Games. Surulere also houses the Teslim Balogun
									Stadium, a multi use Stadium used mainly for football matches
									with an over twenty four thousand sitting capacity. The main
									commercial streets in Surulere are Western Avenue, Adeniran
									Ogunsanya, Adelabu, Ogunalana drive and Aguda, various open
									markets are dispersed in different neighborhoods. Industrial
									establishments are predominantly located at Iponri, Coker and
									Iganmu.
								</p>
							</div>

							<div className='booking_policy'>
								<h5 className='pt-4 mb-4'> Booking Policies </h5>
								<div>
									<div className='row'>
										<div className='col-lg-6 col-md-12'>
											<div className='d-flex'>
												<div>
													<AiOutlineClockCircle />
												</div>
												<div className='detail_div'>
													<h6> Check-in is at 3:00pm </h6>
													<h6> Check-out is at 11:00pm </h6>
													<p className='intro_para'>
														You may request early check-in and/or late check-out
														after booking. Our team will do our best to
														accommodate any requests based on availability.
													</p>
												</div>
											</div>
										</div>
										<div className='col-lg-6 col-md-12'>
											<div className='d-flex'>
												<div>
													<AiOutlineStop />
												</div>
												<div className='detail_div'>
													<h6> House Rules </h6>

													<ul className='intro_para'>
														<li>No smoking (not even on balconies/patios)</li>
														<li>
															No pets (not even really cute ones) unless
															otherwise stated
														</li>
														<li> No parties (not even really quiet ones) </li>
													</ul>
												</div>
											</div>
										</div>
										<div className='col-lg-6 col-md-12'>
											<div className='d-flex'>
												<div>
													<TbMessageReport />
												</div>
												<div className='detail_div'>
													<h6> Note </h6>

													<ul className='intro_para'>
														<li> A mini fridge is available on request.</li>
														<li>
															No room service or on-site parking available.
														</li>
													</ul>
												</div>
											</div>
											<div className='d-flex'>
												<div>
													<TbDisabled />
												</div>
												<div className='detail_div'>
													<h6> Accessibity </h6>

													<ul className='intro_para'>
														<li> Wheelchair accessibility not available</li>
														<li>Elevators available</li>
													</ul>
												</div>
											</div>
										</div>
										<div className='col-lg-6 col-md-12'>
											<div className='d-flex'>
												<div>
													<TbMessageReport />
												</div>
												<div className='detail_div'>
													<h6> Refund Policy </h6>

													<p className='intro_para'>
														We offer flexible cancellations for all bookings.
														Select the Flex Rate to cancel your booking up to
														24hrs before check-in and receive a full refund. For
														longer stays that are paid monthly, we require at
														least 15 days notice to cancel or modify without
														fees.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-5 col-md-5'>
							<div className='apartment_formform_pad'>
								<div className='apartment_formform'>
									<div className='row'>
										<div className='col-12'>
											<div className='d-flex sect1'>
												<img src={two_users} alt='' />
												<div>
													<p style={{ fontWeight: '600', fontSize: '14px' }}>
														Sleeps up to 12
													</p>
													<p> 3 bedrooms, 4 Bathrooms </p>
												</div>
											</div>
											<div className='sect2'>
												<p style={{ fontSize: '14px', marginBottom: '.3rem' }}>
													<strong style={{ fontSize: '18px' }}>
														&#8358;{comma('120000')}/
													</strong>{' '}
													night
												</p>
												<div
													className='d-flex'
													style={{ alignItems: 'center' }}
												>
													<MdOutlinePayments
														size={28}
														color='#155EEF'
														className='me-2'
													/>
													<p style={{ width: '80%' }}>
														Full refund when you cancel 24hrs before check-in
													</p>
												</div>
											</div>
										</div>

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
														<div className='col-lg-6 col-6'>
															<div
																className='p-2 bor_bottom bor_right'
																style={{ alignItems: 'center' }}
															>
																<input
																	type='text'
																	placeholder='Check In'
																	className='form-control'
																	onFocus={(e) => (e.target.type = 'date')}
																	onBlur={(e) => (e.target.type = 'text')}
																	// onChange={(e) => setCheckOut(e.target.value)}
																/>
															</div>
														</div>
														<div className='col-lg-6 col-6 '>
															<div
																className='p-2 bor_bottom'
																style={{ alignItems: 'center' }}
															>
																<input
																	type='text'
																	placeholder='Check Out'
																	className='form-control'
																	onFocus={(e) => (e.target.type = 'date')}
																	onBlur={(e) => (e.target.type = 'text')}
																	// onChange={(e) => setCheckOut(e.target.value)}
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='p-2'>
																<input
																	type='number'
																	placeholder='Guest'
																	className='form-control'
																	// required
																/>
															</div>
														</div>
													</div>
												</div>
												<div className='text-center'>
													<button className='btn form-control btn_save'>
														Book Now
													</button>
												</div>
												{/* {availability && <p> {availability} </p>} */}
											</form>
										</div>
										<div className='sect3'>
											<div className='d-flex justify-content-between'>
												<p>Nights</p>
												<p> 10 </p>
											</div>
											<div className='d-flex justify-content-between'>
												<p>Base price/night</p>
												<p> &#8358;{comma('12000')} </p>
											</div>
											<div className='d-flex justify-content-between'>
												<p> Total </p>
												<p> &#8358;{comma('120000')} </p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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

			<section className='explore_apartments trendy_apartments mb-0 pb-0'>
				<PageHeaderComponent
					topHeader='POPULAR'
					topHeaderColor='rgba(21, 94, 239, 0.8)'
					header='LANDMARKS AROUND HERE'
				/>
				<div className='container landmarks'>
					<div className='row row-mobile px-4'>
						{landmarks.map((item, index) => (
							<div className='col'>
								<img src={item.image} alt='' />
								<h5> {item.name} </h5>
								<p> {item.distance}mins Drive </p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='explore_apartments sim'>
				<PageHeaderComponent
					topHeader='SIMILAR'
					topHeaderColor='rgba(21, 94, 239, 0.8)'
					header='APARTMENTS NEAR YOU'
					link='/apartments-near-you'
					linkText='View all'
				/>
				<ApartmentSlider data={data} />
			</section>
		</main>
	)
}

export default ApartmentDetails
