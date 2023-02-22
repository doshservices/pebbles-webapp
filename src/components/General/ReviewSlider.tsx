import React from 'react'
import Slider from 'react-slick'
import ApartmentCard from '../ApartmentCard'

const ReviewSlider = ({ data }: { data: any[] }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 5050,
		slidesToShow: 3,
		arrows: true,
		slidesToScroll: 3,
		autoplay: false,
		autoplaySpeed: 9000,
		pauseOnHover: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className='container px-5 '>
			<Slider {...settings}>
				{data.map((item, index) => (
					<div key={index} className='p-2 mt-3'>
						<div
							className={
								index === 0
									? 'review_box review_0'
									: index % 2 !== 0
									? 'review_box review_1'
									: 'review_box review_2'
							}
						>
							<p className='message'>"{item.message}"</p>
							<p className='name'> {item.name} </p>
							<p className='location'> {item.location} </p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default ReviewSlider
