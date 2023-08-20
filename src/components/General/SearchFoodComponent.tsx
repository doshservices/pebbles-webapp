import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { book_add_on } from '../../features/booking/bookingSlice'
import { toast } from 'react-hot-toast'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { BiCalendar } from 'react-icons/bi'

const SearchFoodComponent = () => {
	const dispatch = useAppDispatch()

	const { user_detail } = useAppSelector((state) => state.auth)

	const [deliveryAddress, setDeliveryAddress] = useState<any>({})
	const [deliveryDate, setDeliveryDate] = useState('')
	const [deliveryTime, setDeliveryTime] = useState('')
	const [showDeliveryDate, setShowDeliveryDate] = useState(false)

	const setShowDateFalse = () => {
		setShowDeliveryDate(false)
	}

	const showDeliveryDateHandler = () => {
		setShowDeliveryDate(!showDeliveryDate)
	}

	const dateSelectHandler = (item: any) => {
		setDeliveryDate(item)
		setShowDeliveryDate(false)
	}

	const submitHandler = (e: any) => {
		e.preventDefault()
		if (user_detail) {
			let data = {
				address: deliveryAddress?.formatted_address,
				deliveryDate: deliveryDate,
				deliveryTime: deliveryTime,
				serviceType: 'FOOD',
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
						<div className='row'>
							<div
								className='col-md-4 col-sm-12 p-1'
								onClick={() => setShowDateFalse()}
							>
								<div className='' style={{ position: 'relative' }}>
									<span style={{ top: '.3rem' }}>
										<HiOutlineMapPin />
									</span>

									<Autocomplete
										apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
										onPlaceSelected={(place) => {
											setDeliveryAddress(place)
										}}
										className='form-control'
										placeholder='Delivery  Address'
										options={{
											types: ['address'],
										}}
									/>
								</div>
							</div>

							<div
								className='col-md-4 col-sm-12 p-1'
								style={{ position: 'relative' }}
							>
								<span>
									<BiCalendar />
								</span>
								<div
									className='form-control input'
									onClick={showDeliveryDateHandler}
								>
									<p className='mb-0 pb-0' style={{ fontSize: '14px' }}>
										{deliveryDate === ''
											? ' Delivery Date'
											: moment(deliveryDate).format('ddd, MMMM Do')}
									</p>
								</div>
							</div>
							<div
								className='col-md-4 col-sm-12 p-1'
								style={{ position: 'relative' }}
								onClick={() => setShowDateFalse()}
							>
								<span>
									<i className='icofont-clock-time' aria-hidden='true'></i>
								</span>
								<input
									type='text'
									className='form-control'
									placeholder='Delivery Time, e.g. 12pm'
									onChange={(e) => setDeliveryTime(e.target.value)}
								/>
							</div>

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
				{showDeliveryDate && (
					<div className='search_component_div_date ride_date'>
						<Calendar
							date={new Date()}
							onChange={(item: any) => dateSelectHandler(item)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchFoodComponent
