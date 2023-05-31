import NavContent from './NavContent/index'
import NavHead from './NavHead'
import items from './menu'
import { useState } from 'react'
import OutsideClick from '../../OutsideClick'
import { useAppSelector } from '../../../app/hooks'

const Navigation = ({ openMenu, toggleMenu }) => {
	const [collapse, setCollapse] = useState(false)

	const { user_detail } = useAppSelector((state) => state.auth)

	const windowWidth = window.window

	let toggleClass = [
		'pcoded-navbar menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default title-default',
	]
	if (collapse) {
		toggleClass = [...toggleClass, 'navbar-collapsed']
	} else if (openMenu) {
		toggleClass = [...toggleClass, 'mob-open']
	}

	const toggleNavigation = (e) => {
		e.preventDefault()
		setCollapse(!collapse)
	}

	return (
		<nav
			className={toggleClass.join(' ')}
			style={{ backgroundColor: '#f8f8f8' }}
		>
			<OutsideClick handleToggle={toggleMenu}>
				<div className='navbar-wrapper'>
					<NavHead
						collapseMenu={collapse}
						windowWidth={windowWidth}
						onToggleNavigation={toggleNavigation}
					/>
					<NavContent
						permission={user_detail && user_detail.role}
						navigation={items}
					/>
				</div>
			</OutsideClick>
		</nav>
	)
}

export default Navigation
