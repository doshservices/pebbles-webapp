import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import carouselBackground2 from '../../assets/Registration1.jpg'
// import carouselBackground3 from '../../assets/Registration2.png'
import SearchApartmentComponent from './SearchApartmentComponent'

const HomeCarousel = () => {
	// const navigate = useNavigate()

	// const userAuth = useSelector((state) => state.userAuth)
	// const { userDetail } = userAuth

	const settings = {
		dots: true,
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		arrows: false,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 12000,
		pauseOnHover: false,
	}

	return (
		<div className='home_carousel' style={{ position: 'relative' }}>
			<Slider {...settings}>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground1})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>YOUR HOME</h1>
							<h1> AWAY FROM HOME </h1>
							<p>
								Stay in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground2})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>FIND AFFORDABLE </h1>
							<h1>LOCATIONS AROUND YOU</h1>
							<p>
								Stay in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
			</Slider>
			<div className='search_apartment_div'>
				<h3 className='text-center'> FIND AN APARTMENT </h3>
				<div className='search_apartment_div_inner'>
					<div>
						<SearchApartmentComponent />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeCarousel
