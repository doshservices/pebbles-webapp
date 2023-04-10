import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import items from './userDashboard/Navigation/menu'
import { useAppSelector } from '../app/hooks'

const BreadCrumb = ({ loc }) => {
	const { user_detail } = useAppSelector((state) => state.auth)

	const [main, setMain] = useState('')
	const [item, setItem] = useState({})

	useEffect(() => {
		if (loc.pathname.split('/')[4]) {
			setMain(loc.pathname.split('/')[4])
		} else {
			setMain(loc.pathname.split('/')[3])
		}
		if (user_detail) {
			items.map((item, index) => {
				if (item.type && item.type === 'group') {
					getCollapse(item, index)
				}
				return false
			})
		}
	}, [loc, user_detail])

	const getCollapse = (item) => {
		if (item.children) {
			item.children.filter((collapse) => {
				if (collapse.type && collapse.type === 'collapse') {
					getCollapse(collapse)
				} else if (collapse.type && collapse.type === 'item') {
					if (collapse.url === loc.pathname) {
						setItem(item)
						// setMain(collapse)
					}
				}
				return false
			})
		}
	}

	return (
		<div className='page-header'>
			<div className='page-block'>
				<div className='row align-items-center'>
					<div className='col-md-12'>
						{/* <div className='page-header-title'>
							<h5 className='m-b-10'>{main.title}</h5>
						</div> */}
						<ul className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link to='/user/dashboard/home'>
									<i
										className='feather icon-home'
										style={{ color: '#155EEF' }}
									/>
								</Link>
							</li>
							{/* {item?.type === 'item' && (
								<li className='breadcrumb-item'>
									<a href='/#'>{item.title}</a>
								</li>
							)} */}
							{main && (
								<li className='breadcrumb-item'>
									<span>{main}</span>
								</li>
							)}
							{/* {main?.type === 'collapse' && (
								<li className='breadcrumb-item'>
									<span>{main}</span>
								</li>
							)} */}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BreadCrumb
