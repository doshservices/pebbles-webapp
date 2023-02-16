import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'

const SearchApartmentComponent = () => {
	const [value, onChange] = useState(new Date())

	console.log('key', process.env.REACT_APP_GOOGLE_MAPS_API)

	return (
		<div>
			<div className='container search_component_div'>
				<div className='row no-gutters'>
					<div className='col-lg-4 p-1'>
						<span>
							<i className='icofont-google-map' aria-hidden='true'></i>
						</span>
						<Autocomplete
							apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
							onPlaceSelected={(place) => {
								console.log(place)
							}}
							className='form-control'
						/>
					</div>
					<div className='col-lg-8'>
						<div className='row no-gutters'>
							<div className='col-lg-3 p-1'>
								<span>
									<i className='icofont-calendar' aria-hidden='true'></i>
								</span>
								<input
									type='date'
									placeholder='Check-in'
									className='form-control'
								/>
							</div>
							<div className='col-lg-3 p-1'>
								<span>
									<i className='icofont-calendar' aria-hidden='true'></i>
								</span>
								<input
									type='date'
									placeholder='Check-in'
									className='form-control'
								/>
							</div>
							<div className='col-lg-3 p-1'>
								<span>
									<i className='fa fa-home-alt' aria-hidden='true'></i>
								</span>
								<select
									// onChange={(e) => {
									// 	setApartmentType(e.target.value)
									// }}
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
							<div className='col-lg-3 p-1'>
								<button type='submit' className='btn btn-primary form-control'>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchApartmentComponent
