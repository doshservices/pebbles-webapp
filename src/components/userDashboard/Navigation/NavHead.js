import React from 'react'
import { Link } from 'react-router-dom'

const NavHead = (props) => {
	let toggleClass = ['mobile-menu']
	if (props.collapseMenu) {
		toggleClass = [...toggleClass, 'on']
	}

	return (
		<div className='navbar-brand header-logo'>
			<Link to={'/'} className='b-brand'>
				<div className='b-bg'>
					<i className='feather icon-arrow-left' />
				</div>
				<span className='b-title'>FeemFundy</span>
			</Link>
			<a
				href={'#/'}
				className={toggleClass.join(' ')}
				id='mobile-collapse'
				onClick={props.onToggleNavigation}
			>
				<span />
			</a>
		</div>
	)
}

export default NavHead
