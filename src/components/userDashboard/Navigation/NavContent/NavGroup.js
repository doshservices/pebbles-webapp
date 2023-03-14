import React from "react"
import NavCollapse from "./NavCollapse"
import NavItem from "./NavItem"

const NavGroup = ({ nav }) => {
	let navContent

	if (nav.children) {
		const groups = nav.children
		navContent = Object.keys(groups).map((item) => {
			item = groups[item]
			switch (item.type) {
				case "collapse":
					return (
						<NavCollapse
							key={item.id}
							collapse={item}
							type="main"
						/>
					)
				case "item":
					return <NavItem key={item.id} item={item} />
				default:
					return false
			}
		})
	}

	return (
		<>
			<li className="nav-item pcoded-menu-caption">
				<label>{nav.title}</label>
			</li>
			{navContent}
		</>
	)
}

export default NavGroup
