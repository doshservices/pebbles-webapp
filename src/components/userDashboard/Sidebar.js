import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from '../Navs/Navigation'

const Sidebar = ({ open }) => {
	// const auth = useSelector((state) => state.auth)
	// const { detail } = auth

	return (
		<div className={`sidebar ${open ? 'open-m' : ''}`}>
			<div className='logo'>
				<p>Whokup Admin</p>
			</div>
			{/* {detail && <Navigation permission={detail.permissions} />} */}
			<Navigation />
		</div>
	)
}

export default Sidebar
