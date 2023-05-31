import React, { useState } from 'react'
import Slider from 'react-slick'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import carouselBackground2 from '../../assets/Registration1.jpg'
import SearchApartmentComponent from './SearchApartmentComponent'

const HomeCarousel = () => {
	const [showDateValue, setShowDateValue] = useState(true)

	const settings = {
		dots: true,
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		arrows: false,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 12000,
		pauseOnHover: false,
	}

	const dismissHandler = () => {
		setShowDateValue(!showDateValue)
	}

	return (
		<div className='home_carousel' style={{ position: 'relative' }}>
			<Slider {...settings}>
				<div onClick={() => dismissHandler()}>
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
				<div onClick={() => dismissHandler()}>
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
						<SearchApartmentComponent showDateValue={showDateValue} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeCarousel
