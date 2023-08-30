import React from 'react'
import carouselBackground1 from '../../assets/food_bg.png'
import carouselBackground2 from '../../assets/food2.jpg'
import carouselBackground3 from '../../assets/bg_images/food1.jpg'
import carouselBackground4 from '../../assets/bg_images/food2.jpg'
import SearchFoodComponent from './SearchFoodComponent'
import Slider from 'react-slick'

const FoodCarousel = () => {
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
						style={{ backgroundImage: `url(${carouselBackground2})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>EATING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Eat in comfort and style with our highly rated service
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
							<h1>EATING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Eat in comfort and style with our highly rated service
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
							<h1>EATING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Eat in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
				<div>
					<div
						style={{ backgroundImage: `url(${carouselBackground1})` }}
						className='homepage_bg'
					>
						<div className='homepage_div container'>
							<h1>EATING AROUND</h1>
							<h1> MADE EASIER </h1>
							<p>
								Eat in comfort and style with our highly rated service
								apartments.
							</p>
						</div>
					</div>
				</div>
			</Slider>
			<div className='search_apartment_div'>
				<h3 className='text-center'> BOOK A CHEF </h3>
				<div className='search_apartment_div_inner'>
					<div>
						<SearchFoodComponent />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FoodCarousel
