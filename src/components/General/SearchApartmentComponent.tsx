import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { get_search_apartments } from '../../features/apartment/apartmentSlice'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { TfiHome } from 'react-icons/tfi'
import { BiCalendar } from 'react-icons/bi'
import { toast } from 'react-hot-toast'

const SearchApartmentComponent = ({
	showDateValue,
}: {
	showDateValue?: boolean
}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loc, setLoc] = useState<any>({})

	const [apartmentType, setApartmentType] = useState('')
	const [showDate, setShowDate] = useState(false)

	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	])

	const showDateHandler = () => {
		setShowDate(!showDate)
	}

	const dateSelectHandler = (item: any) => {
		setState([item.selection])
		if (item.selection.startDate !== item.selection.endDate) setShowDate(false)
	}

	const submitHandler = () => {
		if (loc) {
			dispatch(
				get_search_apartments({
					loc: loc?.address_components[0]?.long_name,
					checkIn: new Date(state[0].startDate).toISOString(),
					checkOut: new Date(state[0].endDate).toISOString(),
					apartmentType,
					state: loc?.address_components[1]?.long_name,
				})
			)
			navigate('/search-apartments')
		} else {
			toast.error('Please fill all required fields')
		}
	}

	return (
		<div className='search_component_main_div'>
			<div className='container position-relative'>
				<div className='search_component_div'>
					<div className='row no-gutters'>
						<div
							className='col-lg-4 col-md-12 p-1'
							style={{ position: 'relative' }}
							onClick={() => setShowDate(false)}
						>
							<span>
								<HiOutlineMapPin />
							</span>

							<Autocomplete
								apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
								onPlaceSelected={(place) => {
									setLoc(place)
								}}
								// defaultValue={JSON.parse(loc)?.address_components[0]?.long_name}
								className='form-control'
								// placeholder='Enter a location'
							/>
						</div>
						<div className='col-lg-8 col-md-12'>
							<div className='row no-gutters'>
								<div
									className='col-lg-6 col-md-8 col-sm-12 col-12 p-1'
									style={{ position: 'relative' }}
								>
									<span>
										<BiCalendar />
									</span>
									<div className='form-control input' onClick={showDateHandler}>
										<p className='mb-0 pb-0' style={{ fontSize: '14px' }}>
											{moment(state[0].startDate).format('YYYY-MM-DD') ===
												String(moment(new Date()).format('YYYY-MM-DD')) &&
											moment(state[0].endDate).format('YYYY-MM-DD') ===
												String(moment(new Date()).format('YYYY-MM-DD'))
												? 'Check-in Date - Check-out Date'
												: `${moment(state[0].startDate).format(
														'ddd, MMMM Do'
												  )} - ${moment(state[0].endDate).format(
														'ddd, MMMM Do'
												  )}`}
										</p>
									</div>
								</div>
								<div
									className='col-lg-3 col-md-4 col-sm-12 p-1'
									style={{ position: 'relative' }}
									onClick={() => setShowDate(false)}
								>
									<span>
										<TfiHome />
									</span>
									<select
										onChange={(e) => {
											setApartmentType(e.target.value)
										}}
										className='form-control form-select form-input'
									>
										<option value=''> Apartment Type </option>
										<option value='BQ'>BQ</option>
										<option value='Studio'>Studio</option>
										<option value='1 Bedroom Flat'>1 Bedroom Flat</option>
										<option value='2 Bedrooms Flat'>2 Bedrooms Flat</option>
										<option value='3 Bedrooms Flat'>3 Bedrooms Flat</option>
										<option value='4 Bedrooms Flat'>4 Bedrooms Flat</option>
										<option value='5 Bedrooms Flat'>5 Bedrooms Flat</option>
										<option value='6 Bedrooms Flat'>6 Bedrooms Flat</option>
										<option value='7 Bedrooms Flat'>7 Bedrooms Flat</option>
										<option value='8 Bedrooms Flat'>8 Bedrooms Flat</option>
										<option value='9 Bedrooms Flat'>9 Bedrooms Flat</option>
										<option value='10 Bedrooms Flat'>10 Bedrooms Flat</option>
										<option value='Party House/Bash Pad'>
											Party House/Bash Pad
										</option>
										<option value='Flat'>Flat</option>
										<option value='Hotel Boutique'>Hotel Boutique</option>
										<option value='Terrace'>Terrace</option>
										<option value='Bungalow'>Bungalow</option>
										<option value='Detached'>Detached</option>
										<option value='Semi-Detached'>Semi-Detached</option>
										<option value='Cottage/Farmhouse/Ranch'>
											Cottage/Farmhouse/Ranch
										</option>
										<option value='Villa/Mansions'>Villa/Mansions</option>
									</select>
								</div>
								<div
									className='col-lg-3 col-sm-12 p-1'
									onClick={() => setShowDate(false)}
								>
									<button
										type='submit'
										className='btn btn-primary form-control btn_search'
										onClick={() => submitHandler()}
									>
										Search
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{showDate && (
					<div className='search_component_div_date'>
						<DateRange
							editableDateInputs={true}
							onChange={(item: any) => dateSelectHandler(item)}
							moveRangeOnFirstSelection={false}
							ranges={state}
							minDate={new Date()}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchApartmentComponent
