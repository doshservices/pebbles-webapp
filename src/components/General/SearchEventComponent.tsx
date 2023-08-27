import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useAppDispatch } from '../../app/hooks'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { get_search_events } from '../../features/event/eventSlice'
import { HiOutlineMapPin } from 'react-icons/hi2'

const SearchEventComponent = () => {
	const dispatch = useAppDispatch()

	const [loc, setLoc] = useState<any>('')

	const submitHandler = () => {
		dispatch(
			get_search_events({
				loc,
			})
		)
	}

	return (
		<div className='search_component_main_div'>
			<div className='container position-relative'>
				<div className='search_component_div'>
					<div className='row no-gutters'>
						<div className='col-sm-9 p-1' style={{ position: 'relative' }}>
							<span>
								<HiOutlineMapPin />
							</span>

							<input
								onChange={(e) => {
									setLoc(e.target.value)
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
