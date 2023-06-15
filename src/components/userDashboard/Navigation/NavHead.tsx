import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/Logo_blue.png'

const NavHead = ({ collapseMenu, windowWidth, onToggleNavigation }) => {
	// let toggleClass = ['mobile-menu']
	// if (collapseMenu) {
	// 	toggleClass = [...toggleClass, 'on']
	// }

	return (
		<div className='navbar-brand header-logo'>
			<Link to={'/'} className='b-brand'>
				<img
					src={logo}
					alt='logo'
					className='img-fluid'
					style={{ width: '10rem' }}
				/>
			</Link>
			{/* <a
				href={'#/'}
				className={toggleClass.join(' ')}
				id='mobile-collapse'
				onClick={onToggleNavigation}
			>
				<span />
			</a> */}
		</div>
	)
}

export default NavHead
