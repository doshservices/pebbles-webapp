import React from 'react'
import LineChart from '../../components/LineChart'

const UserDashboardHome = () => {
	const dataData1 = [8, 29, 7, 8, 5, 1, 2]
	const dataData2 = [12, 19, 3, 5, 2, 3, 6]

	return (
		<main className='dashboard'>
			<h6 className=''> All Time </h6>
			<div className='row mb-4'>
				<div className='col-md-3 col-sm-6'>
					<div className='stat_box stat_box1'>
						<h5> 10 </h5>
						<p> Apartment Booked </p>
					</div>
				</div>
				<div className='col-md-3 col-sm-6'>
					<div className='stat_box stat_box2'>
						<h5> 10 </h5>
						<p> Sheduled Booking </p>
					</div>
				</div>
				<div className='col-md-3 col-sm-6'>
					<div className='stat_box stat_box3'>
						<h5> 10 </h5>
						<p> Check-Ins </p>
					</div>
				</div>
				<div className='col-md-3 col-sm-6'>
					<div className='stat_box stat_box4'>
						<h5> 10 </h5>
						<p> Check-Outs </p>
					</div>
				</div>
			</div>

			<div>
				<select
					className='form-select mb-3'
					style={{ width: '10rem', fontSize: '14px' }}
				>
					<option value='week'> Week </option>
					<option value='month'> Month </option>
				</select>
				<LineChart userData1={dataData1} userData2={dataData2} />
			</div>
		</main>
	)
}

export default UserDashboardHome
