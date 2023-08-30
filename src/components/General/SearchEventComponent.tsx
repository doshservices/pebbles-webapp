import React, { useState } from 'react'
import Autocomplete from 'react-google-autocomplete'
import { useAppDispatch } from '../../app/hooks'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { get_search_events } from '../../features/event/eventSlice'
import { HiOutlineMapPin } from 'react-icons/hi2'

export const ErrorPara = ({ message }: { message: string }) => {
	return (
		<p
			style={{
				color: 'red',
				fontWeight: '600',
				marginTop: '.5rem',
				fontSize: '12px',
			}}
		>
			{message}
		</p>
	)
}

const SearchEventComponent = () => {
	const dispatch = useAppDispatch()

	const [loc, setLoc] = useState<any>('')
	const [message, setMessage] = useState<string | null>(null)

	const submitHandler = () => {
		if (loc) {
			dispatch(
				get_search_events({
					loc,
				})
			)
		} else setMessage('Please choose a location')
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
								className='btn btn-primary form-control btn_search'
								onClick={() => submitHandler()}
							>
								Search
							</button>
						</div>
						{message && <ErrorPara message={message} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchEventComponent
