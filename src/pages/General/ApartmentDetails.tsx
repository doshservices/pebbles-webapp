import React from 'react'
import SearchApartmentComponent from '../../components/General/SearchApartmentComponent'
import bgImage from '../../assets/carouselBackground1.png'
import bgImage2 from '../../assets/Registration1.jpg'
import { Link } from 'react-router-dom'
import { comma } from '../../utils/helper'
import { FaSnowflake } from 'react-icons/fa'
import { AiOutlineWifi } from 'react-icons/ai'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdOutlinePool } from 'react-icons/md'
import { SlScreenDesktop } from 'react-icons/sl'
import { CgGym } from 'react-icons/cg'

const ApartmentDetails = () => {
	const pressHandler = () => {}

	const amenities = [
		'24hrs Power Supply',
		'Air conditioning',
		'Fast Wi-Fi',
		'Swimming pool',
		'TV with Netflix, Amazon and Julu',
		'Fitness Gym',
	]

	return (
		<section className='apartment_details_page page_padding'>
			<div className='navbar_search'>
				<SearchApartmentComponent />
			</div>
			<div className='container'>
				<div>
					<div className='row mb-5'>
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
				</div>

				<div>
					<div className='row'>
						<div className='col-md-7'>
							<div>
								<h3>3 Bedroom Detached Duplex</h3>
								<p>
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

							<div>
								<h2>HOUSE DETAILS</h2>
								<h5>Available Amenities</h5>

								<div className='row'>
									{amenities.map((item, index) => (
										<div className='col-md-6 col-sm-6' key={index}>
											<div className='d-flex'>
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
													<CgGym size={22} />
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className='col-lg-5 col-md-5'>
							<div className='apartment_formform'>
								<div className='row'>
									<div className='col-6'>
										<p>
											<strong>&#8358;{comma('120000')}/</strong> night
										</p>
									</div>
									<div className='col-6'>
										<span>
											{/* <img src={star} alt="" /> */}
											<strong> 4.6</strong> (23 reviews)
										</span>
									</div>
									<div className='col-md-12'>
										<form action=''>
											<div className='apartment_formform_div'>
												<div className='row no-gutters'>
													<div className='col-lg-6 p-3 bor_bottom bor_right'>
														<label className='checkin' htmlFor=''>
															Check-in
														</label>
														<div
															className='d-flex mt-2 '
															style={{ alignItems: 'center' }}
														>
															<span className='mr-1'>From: </span>
															<input
																type='date'
																style={{ width: '80%' }}
																className='form-control'
															/>
														</div>
													</div>
													<div className='col-lg-6 p-3 bor_bottom'>
														<label className='checkout' htmlFor=''>
															Check-out
														</label>
														<div
															className='d-flex mt-2'
															style={{ alignItems: 'center' }}
														>
															<span className='mr-1'>To: </span>
															<input
																type='date'
																style={{ width: '80%' }}
																className='form-control'
															/>
														</div>
													</div>
													<div className='col-md-12 p-3'>
														<label className='guest' htmlFor=''>
															Guest
														</label>
														<input
															type='number'
															className='form-control guest_input'
															// required
														/>
													</div>
												</div>
											</div>
											<div className='text-center mt-3'>
												<button
													onClick={pressHandler}
													className='btn btn_check m-1'
													// disabled={isLoading}
												>
													{/* {isLoading ? (
													<i className="fa fa-spinner"></i>
												) : (
													"Check availability"
												)} */}
													Check availability
												</button>
												<button className='btn btn_save m-1'>
													<Link to={`/start-booking/1`}>Book apartment</Link>
												</button>
											</div>
											{/* {availability && <p> {availability} </p>} */}
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ApartmentDetails
