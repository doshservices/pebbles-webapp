import NavContent from './NavContent/index'
import NavHead from './NavHead'
import navigation from './menu'
import { useState } from 'react'
import OutsideClick from '../../OutsideClick'

const Navigation = (props) => {
	const [collapse, setCollapse] = useState(false)

	let toggleClass = [
		'pcoded-navbar menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default title-default',
	]
	if (collapse) {
		toggleClass = [...toggleClass, 'navbar-collapsed']
	} else if (props.openMenu) {
		toggleClass = [...toggleClass, 'mob-open']
	}

	const toggleNavigation = (e) => {
		e.preventDefault()
		setCollapse(!collapse)
	}

	return (
		<nav className={toggleClass.join(' ')}>
			<OutsideClick handleToggle={props.toggleMenu}>
				<div className='navbar-wrapper'>
					<NavHead
						collapseMenu={collapse}
						windowWidth={props.windowWidth}
						onToggleNavigation={toggleNavigation}
					/>
					<NavContent navigation={navigation.items} />
				</div>
			</OutsideClick>
		</nav>
	)
}

export default Navigation
