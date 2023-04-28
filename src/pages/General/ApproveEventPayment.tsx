import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import Loader from '../../components/Loader'
import { flutter_verify_event } from '../../features/event/eventSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FaCheckCircle } from 'react-icons/fa'

const ApproveEventPayment = () => {
	const dispatch = useAppDispatch()
	const location = useLocation()

	const searchParams = location.search.split('&').map((e) => e.split('=')[1])

	console.log(searchParams)

	const { isFlutterVerify, flutterVerify } = useAppSelector(
		(state) => state.booking
	)

	useEffect(() => {
		dispatch(
			flutter_verify_event({
				transaction_id: searchParams[3],
				amount: searchParams[0],
			})
		)
	}, [dispatch, searchParams[3], searchParams[0]])

	return (
		<div>
			{isFlutterVerify ? (
				<Loader />
			) : flutterVerify ? (
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-md-6'>
							<div className='verify-box'>
								<FaCheckCircle
									color='green'
									size={40}
									className='bs_good'
									style={{
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '1rem',
									}}
								/>

								<h3 style={{ color: 'green' }}> Payment Successful! </h3>
								<p>
									Your payment for the event has been processed and verified
									successfully.
								</p>

								<Link to='/events'> Go to Events </Link>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-md-6'>
							<div className='verify-box'>
								<BiError
									color='red'
									size={40}
									className='bs_good'
									style={{
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '1rem',
									}}
								/>

								<h3 style={{ color: 'red' }}> Payment Not Successful! </h3>
								<p>
									Your payment for the event failed and was not verified
									successfully.
								</p>

								<Link to='/events' style={{ background: 'red' }}>
									Go to Events
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ApproveEventPayment
