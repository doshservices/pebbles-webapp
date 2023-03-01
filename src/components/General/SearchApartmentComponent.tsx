import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { get_search_apartments } from '../../features/apartment/apartmentSlice'

const SearchApartmentComponent = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loc, setLoc] = useState<any>({})
	const [checkIn, setCheckIn] = useState('')
	const [checkOut, setCheckOut] = useState('')
	const [apartmentType, setApartmentType] = useState('')

	console.log('loc', loc)

	const submitHandler = () => {
		dispatch(
			get_search_apartments({
				loc: loc?.formatted_address,
				checkIn,
				checkOut,
				apartmentType,
			})
		)

		navigate('/search-apartments')
	}

	return (
		<div className='search_component_main_div'>
			<div className='container'>
				<div className='search_component_div'>
					<div className='row no-gutters'>
						<div
							className='col-lg-4 col-md-12 p-1'
							style={{ position: 'relative' }}
						>
							<span>
								<i className='icofont-google-map' aria-hidden='true'></i>
							</span>
							<Autocomplete
								apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
								onPlaceSelected={(place) => {
									setLoc(place)
								}}
								className='form-control'
								placeholder='Enter a location'
							/>
						</div>
						<div className='col-lg-8 col-md-12'>
							<div className='row no-gutters'>
								<div
									className='col-lg-3 col-md-4 col-sm-6 col-6 p-1'
									style={{ position: 'relative' }}
								>
									<span>
										<i className='icofont-calendar' aria-hidden='true'></i>
									</span>
									<input
										type='text'
										placeholder='Check In'
										className='form-control'
										onFocus={(e) => (e.target.type = 'date')}
										onBlur={(e) => (e.target.type = 'text')}
										onChange={(e) => setCheckIn(e.target.value)}
									/>
								</div>
								<div
									className='col-lg-3 col-md-4 col-sm-6 col-6 p-1'
									style={{ position: 'relative' }}
								>
									<span>
										<i className='icofont-calendar' aria-hidden='true'></i>
									</span>
									<input
										type='text'
										placeholder='Check Out'
										className='form-control'
										onFocus={(e) => (e.target.type = 'date')}
										onBlur={(e) => (e.target.type = 'text')}
										onChange={(e) => setCheckOut(e.target.value)}
									/>
								</div>
								<div
									className='col-lg-3 col-md-4 col-sm-12 p-1'
									style={{ position: 'relative' }}
								>
									<span>
										<i className='fa fa-home-alt' aria-hidden='true'></i>
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
								<div className='col-lg-3 col-sm-12 p-1'>
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchApartmentComponent
