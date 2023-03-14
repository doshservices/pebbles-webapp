import React from 'react'
import { Link } from 'react-router-dom'
import NavRight from './NavRight'

const NavHeader = (props) => {
	return (
		<header className={`navbar pcoded-header navbar-expand-lg header-default`}>
			<div className='m-header'>
				<Link
					className={`mobile-menu ${props.openMenu && 'on'}`}
					id='mobile-collapse1'
					to={'/#'}
					onClick={props.toggleMenu}
				>
					<span />
				</Link>
				<Link to={'/'} className='b-brand'>
					<div className='b-bg'>
						<i className='feather icon-arrow-left' />
					</div>
					<span className='b-title'>FeemFundy</span>
				</Link>
			</div>
			<Link className='mobile-menu' id='mobile-header' to={'/#'}>
				<i className='feather icon-more-horizontal' />
			</Link>
			<div className='collapse navbar-collapse'>
				<NavRight />
			</div>
		</header>
	)
}

export default NavHeader
