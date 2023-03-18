import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ item }) => {
	return (
		<li>
			<NavLink to={item.url} className='nav-link'>
				<span className='pcoded-micon'>
					<i className={item.icon} />
				</span>
				<span className='pcoded-mtext'>{item.title}</span>
			</NavLink>
		</li>
	)
}

export default NavItem
