import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { get_search_apartments } from '../../features/apartment/apartmentSlice'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'

const SearchRideComponent = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loc, setLoc] = useState<any>({})
	const [pickupDate, setPickupDate] = useState('')
	const [departureDate, setDepartureDate] = useState('')
	const [bookRound, setBookRound] = useState(false)
	const [apartmentType, setApartmentType] = useState('')
	const [showDepartureDate, setShowDepartureDate] = useState(false)
	const [showPickupDate, setShowPickupDate] = useState(false)

	const setShowDateFalse = () => {
		setShowDepartureDate(false)
		setShowPickupDate(false)
	}

	const showPickupDateHandler = () => {
		setShowPickupDate(!showPickupDate)
	}

	const showDepartureDateHandler = () => {
		setShowDepartureDate(!showDepartureDate)
	}

	const submitHandler = () => {
		navigate('/search-apartments')
	}

	const setBookRoundHandler = () => {
		setBookRound(!bookRound)
		setShowDateFalse()
	}

	return (
		<div className='search_component_main_div'>
			<div className='container position-relative'>
				<div className='search_component_div'>
					<div className='row '>
						<div
							className='col-lg-7 col-md-12'
							onClick={() => setShowDateFalse()}
						>
							<div className='row'>
								<div className='col-lg-6 p-1' style={{ position: 'relative' }}>
									<span>
										<i className='icofont-google-map' aria-hidden='true'></i>
									</span>

									<Autocomplete
										apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
										onPlaceSelected={(place) => {
											setLoc(place)
										}}
										className='form-control'
										placeholder='Pickup  Address'
									/>
								</div>
								<div className='col-lg-6 p-1' style={{ position: 'relative' }}>
									<span>
										<i className='icofont-google-map' aria-hidden='true'></i>
									</span>

									<Autocomplete
										apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
										onPlaceSelected={(place) => {
											setLoc(place)
										}}
										className='form-control'
										placeholder='Destination'
									/>
								</div>
							</div>
						</div>
						<div className='col-lg-5 col-md-12'>
							<div className='row no-gutters'>
								<div
									className='col-lg-6 col-md-8 col-sm-12 col-12 p-1'
									style={{ position: 'relative' }}
								>
									<span>
										<i className='icofont-calendar' aria-hidden='true'></i>
									</span>
									<div
										className='form-control input'
										onClick={showPickupDateHandler}
									>
										<p className='mb-0 pb-0' style={{ fontSize: '14px' }}>
											{pickupDate === ''
												? ' Pickup Date'
												: moment(pickupDate).format('ddd, MMMM Do')}
										</p>
									</div>
								</div>
								<div
									className='col-lg-6 col-md-4 col-sm-12 p-1'
									style={{ position: 'relative' }}
									onClick={() => setShowDateFalse()}
								>
									<span>
										<i className='icofont-clock-time' aria-hidden='true'></i>
									</span>
									<input
										type='text'
										className='form-control'
										placeholder='Pickup Time, e.g. 12pm'
									/>
								</div>
							</div>
						</div>
						<div className='col-12'>
							<input type='checkbox' onChange={(e) => setBookRoundHandler()} />{' '}
							<label className='book_trip_text'> Book roundtrip </label>
						</div>
						{bookRound && (
							<div className='col-lg-7'>
								<div className='row'>
									<div
										className='col-lg-6 col-md-8 col-sm-12 col-12 p-1'
										style={{ position: 'relative' }}
									>
										<span>
											<i className='icofont-calendar' aria-hidden='true'></i>
										</span>
										<div
											className='form-control input'
											onClick={showDepartureDateHandler}
										>
											<p className='mb-0 pb-0' style={{ fontSize: '14px' }}>
												{departureDate === ''
													? ' Departure Date'
													: moment(departureDate).format('ddd, MMMM Do')}
											</p>
										</div>
									</div>
									<div
										className='col-lg-6 col-md-4 col-sm-12 p-1'
										style={{ position: 'relative' }}
										onClick={() => setShowDateFalse()}
									>
										<span>
											<i className='icofont-clock-time' aria-hidden='true'></i>
										</span>
										<input
											type='text'
											className='form-control'
											placeholder='Departure Time, e.g. 12pm'
										/>
									</div>
								</div>
							</div>
						)}
						<div
							className='col-lg-12 col-sm-12 p-1'
							onClick={() => setShowDateFalse()}
						>
							<button
								type='submit'
								className='btn btn-primary form-control'
								onClick={() => submitHandler()}
							>
								Search
							</button>
						</div>
					</div>
				</div>
				{showPickupDate && (
					<div className='search_component_div_date'>
						<Calendar
							date={new Date()}
							onChange={(item) => setPickupDate(item)}
						/>
					</div>
				)}
				{showDepartureDate && (
					<div className='search_component_div_date'>
						<Calendar
							date={new Date()}
							onChange={(item) => setDepartureDate(item)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchRideComponent
