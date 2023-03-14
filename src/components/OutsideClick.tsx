import React, { useRef, useEffect } from 'react'

export default function OutsideClick(props) {
	const ref = useRef<any>(null)
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current?.contains(event.target)) {
				props.handleToggle()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, props])

	return (
		<div className='outside-click search-mobile' ref={ref}>
			{props.children}
		</div>
	)
}
