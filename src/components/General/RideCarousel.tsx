import React from 'react'
import Slider from 'react-slick'
import carouselBackground1 from '../../assets/bg_images/ride1.jpg'
import carouselBackground2 from '../../assets/bg_images/ride2.jpg'
import carouselBackground3 from '../../assets/bg_images/ride3.jpg'
import carouselBackground4 from '../../assets/bg_images/ride4.jpg'
// import carouselBackground2 from '../../assets/ride2.png'
import SearchRideComponent from './SearchRideComponent'

const RideCarousel = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		arrows: false,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 9000,
		pauseOnHover: false,
	}

	return (
		<div
			className='home_carousel ride_carousel'
			style={{ position: 'relative' }}
		>
			<Slider {...settings}>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground1})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>MOVING AROUND</h1>
							<h1> MADE EASIER </h1>
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
							<h1>MOVING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Stay in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground3})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>MOVING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Stay in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground4})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>MOVING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Stay in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
			</Slider>
			<div className='search_apartment_div'>
				<h3 className='text-center'> FIND A RIDE </h3>
				<div className='search_apartment_div_inner'>
					<div>
						<SearchRideComponent />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RideCarousel
