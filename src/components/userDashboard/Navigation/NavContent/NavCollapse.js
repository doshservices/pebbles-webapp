import React, { useState } from "react"
import { Link } from "react-router-dom"

const NavCollapse = ({ collapse }) => {
	const [expand, setExpand] = useState(false)

	const toggleExpand = (e) => {
		e.preventDefault()
		setExpand(!expand)
	}

	return (
		<li
			className={`nav-item pcoded-hasmenu ${
				expand && "active pcoded-trigger"
			}`}
		>
			<a
				href="/#"
				className={`nav-link ${expand && "active"}`}
				onClick={toggleExpand}
			>
				<span className="pcoded-micon">
					<i className={collapse.icon} />
				</span>
				<span className="pcoded-mtext">{collapse.title}</span>
			</a>
			<ul className="pcoded-submenu">
				{collapse.children.map((child) => (
					<li key={child.id}>
						<Link to={child.url} className="nav-link">
							{child.title}
						</Link>
					</li>
				))}
			</ul>
		</li>
	)
}

export default NavCollapse
