import React from 'react'
import Autocomplete from 'react-google-autocomplete'

const SearchApartmentComponent = () => {
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
								<input
									type='date'
									placeholder='Check-in'
									className='form-control'
								/>
							</div>
							<div className='col-lg-3 p-1'>
								<input
									type='text'
									placeholder='Check-in'
									className='form-control'
								/>
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
