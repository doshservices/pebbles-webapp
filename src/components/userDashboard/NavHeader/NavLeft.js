import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const NavLeft = (props) => {
	const [openSearch, setOpenSearch] = useState(false)

	const searchHandler = (e) => {
		e.preventDefault()
		setOpenSearch(!openSearch)
	}

	return (
		<ul className='navbar-nav mr-auto'>
			<li>
				<a href='#/' className='full-screen' onClick={props.handle}>
					<i className='feather icon-maximize' />
				</a>
			</li>
			{/* <li className='nav-item'>
				<div id='main-search' className={`main-search ${openSearch && 'open'}`}>
					<div className='input-group'>
						<input
							type='text'
							id='m-search'
							className='form-control'
							placeholder='Search . . .'
							style={{ width: openSearch ? '90px' : '0px' }}
						/>
						<a
							href={'#/'}
							className='input-group-append search-close'
							onClick={searchHandler}
						>
							<i className='feather icon-x input-group-text' />
						</a>
						<span
							className='input-group-append search-btn btn btn-primary'
							onClick={searchHandler}
						>
							<i className='feather icon-search input-group-text' />
						</span>
					</div>
				</div>
			</li> */}
		</ul>
	)
}

export default NavLeft
