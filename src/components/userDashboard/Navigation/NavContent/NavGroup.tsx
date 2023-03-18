import React from 'react'
import { MenuItemInterface } from '../menuState'
import NavCollapse from './NavCollapse'
import NavItem from './NavItem'

const NavGroup = ({
	nav,
	permission,
}: {
	nav: MenuItemInterface
	permission: string | null
}) => {
	let navContent

	if (nav?.children) {
		const groups = nav.children
		navContent = groups?.map((item) => {
			// item = groups[item]
			switch (item.type) {
				case 'collapse':
					return (
						<NavCollapse
							key={item.id}
							collapse={item}
							// type='main'
						/>
					)
				case 'item':
					return (
						permission &&
						item.permission.includes(permission) && (
							<NavItem key={item.id} item={item} />
						)
					)
				default:
					return false
			}
		})
	}

	return <div className='mt-5'>{navContent}</div>
}

export default NavGroup
