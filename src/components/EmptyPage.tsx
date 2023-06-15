import React from 'react'
import empty from '../assets/empty.png'

const EmptyPage = ({ header, para }: { header: string; para?: string }) => {
	return (
		<div className='text-center' style={{ marginTop: 48 }}>
			<img src={empty} alt='empty icon' style={{ width: '20rem' }} />
			<h4> {header} </h4>
			<p> {para} </p>
		</div>
	)
}

export default EmptyPage
