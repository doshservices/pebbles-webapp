import React from 'react'
import { Link } from 'react-router-dom'
import '././../../styles/component.css'

const PageHeaderComponent = ({
	topHeader,
	header,
	link,
	topHeaderColor,
	linkText,
}: {
	topHeader: string
	header: string
	link: string
	topHeaderColor: string
	linkText: string
}) => {
	return (
		<div className='container page_header_component'>
			<div className='d-flex' style={{ alignItems: 'center' }}>
				<div
					style={{ backgroundColor: topHeaderColor }}
					className='blue_line'
				></div>
				<h6 style={{ color: topHeaderColor }}> {topHeader} </h6>
			</div>

			<div className='d-flex justify-content-between pt-0 mt-1'>
				<h3> {header} </h3>

				<Link to={link} style={{ color: topHeaderColor }}>
					{linkText}
				</Link>
			</div>
		</div>
	)
}

export default PageHeaderComponent
