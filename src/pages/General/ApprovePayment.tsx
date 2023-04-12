import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import Loader from '../../components/Loader'

const ApprovePayment = () => {
	const params = useParams()
	const location = useLocation()
	console.log(params)
	console.log(location.search.split('&').map((e) => e.split('=')[1]))

	const searchParams = location.search.split('&').map((e) => e.split('=')[1])

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(
	// 		flutter_verify_booking(searchParams[0], searchParams[2], searchParams[3])
	// 	)

	// 	return () => {
	// 		dispatch({ type: FLUTTER_VERIFY_BOOKING_RESET })
	// 	}
	// }, [dispatch, searchParams[0], searchParams[2], searchParams[3]])

	return (
		// <div>
		// 	{loading ? (
		// 		<Loader />
		// 	) : flutterVerify ? (
		// 		<div className='container'>
		// 			<div className='row justify-content-center'>
		// 				<div className='col-md-6'>
		// 					<div className='verify-box'>
		// 						<BsCheck2Circle
		// 							color='green'
		// 							size={40}
		// 							className='bs_good'
		// 							style={{
		// 								marginLeft: 'auto',
		// 								marginRight: 'auto',
		// 								marginBottom: '1rem',
		// 							}}
		// 						/>

		// 						<h3 style={{ color: 'green' }}> Payment Successful! </h3>
		// 						<p>
		// 							The payment for your booking has been processed and verified
		// 							successfully.
		// 						</p>

		// 						<Link to='/dashboard/bookings'> Go to Bookings </Link>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	) : (
		// 		<div className='container'>
		// 			<div className='row justify-content-center'>
		// 				<div className='col-md-6'>
		// 					<div className='verify-box'>
		// 						<BiError
		// 							color='red'
		// 							size={40}
		// 							className='bs_good'
		// 							style={{
		// 								marginLeft: 'auto',
		// 								marginRight: 'auto',
		// 								marginBottom: '1rem',
		// 							}}
		// 						/>

		// 						<h3 style={{ color: 'red' }}> Payment Not Successful! </h3>
		// 						<p>
		// 							The payment for your booking failed and was not verified
		// 							successfully.
		// 						</p>

		// 						<Link to='/dashboard/bookings' style={{ background: 'red' }}>
		// 							Go to Bookings
		// 						</Link>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	)}
		// </div>
		<p>Approve payment</p>
	)
}

export default ApprovePayment
