import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const SearchEventComponent = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loc, setLoc] = useState<any>({})

	const submitHandler = () => {
		// dispatch(
		// 	get_search_apartments({
		// 		loc: loc?.formatted_address,
		// 	})
		// )

		navigate('/search-apartments')
	}

	return (
		<div className='search_component_main_div'>
			<div className='container position-relative'>
				<div className='search_component_div'>
					<div className='row no-gutters'>
						<div className='col-sm-9 p-1' style={{ position: 'relative' }}>
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

						<div className='col-sm-3 p-1'>
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
	)
}

export default SearchEventComponent
