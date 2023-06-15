import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// import { MultiSelect } from 'react-multi-select-component'
import moment from 'moment'
import { book_add_on } from '../../features/booking/bookingSlice'
import { toast } from 'react-hot-toast'
import Multiselect from 'multiselect-react-dropdown'

const SearchRideComponent = () => {
	const dispatch = useAppDispatch()

	const { user_detail } = useAppSelector((state) => state.auth)

	const [pickupAddress, setPickupAddress] = useState<any>({})
	const [destination, setDestination] = useState<any>({})
	const [pickupDate, setPickupDate] = useState('')
	const [pickupTime, setPickupTime] = useState('')
	const [carAmenities, setCarAmenities] = useState([])
	const [departureTime, setDepartureTime] = useState('')
	const [departureDate, setDepartureDate] = useState('')
	const [bookRound, setBookRound] = useState(false)
	const [showDepartureDate, setShowDepartureDate] = useState(false)
	const [showPickupDate, setShowPickupDate] = useState(false)

	const options = [
		{ name: 'With Security', id: 'With Security' },
		{ name: 'Luxury Rides', id: 'Luxury Rides' },
	]

	const onSelect = (selectedList, selectedItem) => {
		setCarAmenities(selectedList)
	}

	const onRemove = (selectedList, removedItem) => {}

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

	const setBookRoundHandler = () => {
		setBookRound(!bookRound)
		setShowDateFalse()
	}

	const pickupSelectHandler = (item: any) => {
		setPickupDate(item)
		setShowPickupDate(false)
	}

	const delSelectHandler = (item: any) => {
		setDepartureDate(item)
		setShowDepartureDate(false)
	}

	const submitHandler = (e: any) => {
		e.preventDefault()
		if (user_detail) {
			let data = {
				address: pickupAddress?.formatted_address,
				destination: destination?.formatted_address,
				pickUpDate: pickupDate,
				pickUpTime: pickupTime,
				deliveryDate: departureDate,
				deliveryTime: departureTime,
				serviceType: 'RIDE',
				amenities: carAmenities?.map((item: any) => item.name),
			}
			dispatch(book_add_on(data))
		} else {
			toast.error('Please login to use this service')
		}
	}

	return (
		<div className='search_component_main_div'>
			<div className='container position-relative'>
				<div className='search_component_div'>
					<form>
						<div className='row '>
							<div
								className='col-lg-7 col-md-12'
								onClick={() => setShowDateFalse()}
							>
								<div className='row'>
									<div
										className='col-lg-6 p-1'
										style={{ position: 'relative' }}
									>
										<span>
											<i className='icofont-google-map' aria-hidden='true'></i>
										</span>

										<Autocomplete
											apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
											onPlaceSelected={(place) => {
												setPickupAddress(place)
											}}
											className='form-control'
											placeholder='Pickup  Address'
											options={{
												types: ['address'],
											}}
										/>
									</div>
									<div
										className='col-lg-6 p-1'
										style={{ position: 'relative' }}
									>
										<span>
											<i className='icofont-google-map' aria-hidden='true'></i>
										</span>

										<Autocomplete
											apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
											onPlaceSelected={(place) => {
												setDestination(place)
											}}
											className='form-control'
											placeholder='Destination'
											options={{
												types: ['address'],
											}}
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
											onChange={(e) => setPickupTime(e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className='col-md-8 mb-3'>
								<label htmlFor='' className='book_trip_text'>
									Select Ride Amenities
								</label>
								<div className=' '>
									<Multiselect
										options={options}
										selectedValues={carAmenities}
										onSelect={onSelect}
										onRemove={onRemove}
										displayValue='name'
										className='form-control input_multi'
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<input
									type='checkbox'
									onChange={(e) => setBookRoundHandler()}
								/>{' '}
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
												<i
													className='icofont-clock-time'
													aria-hidden='true'
												></i>
											</span>
											<input
												type='text'
												className='form-control'
												placeholder='Departure Time, e.g. 12pm'
												onChange={(e) => setDepartureTime(e.target.value)}
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
									onClick={(e) => submitHandler(e)}
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
				{showPickupDate && (
					<div className='search_component_div_date ride_date'>
						<Calendar
							date={new Date()}
							onChange={(item) => pickupSelectHandler(item)}
						/>
					</div>
				)}
				{showDepartureDate && (
					<div className='search_component_div_date ride_date'>
						<Calendar
							date={new Date()}
							onChange={(item) => delSelectHandler(item)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchRideComponent
