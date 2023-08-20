import React from 'react'
import Slider from 'react-slick'
import review_img from '../../assets/review_img.png'

const ReviewSlider = ({ data }: { data: any[] }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 400,
		slidesToShow: 3,
		arrows: true,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 3000,
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
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					arrows: false,
				},
			},
		],
	}

	return (
		<div className='container px-5 '>
			<Slider {...settings}>
				{data.map((item, index) => (
					<div key={index} className='p-2 mt-3'>
						<div className={'review_box'}>
							<p className='message'>"{item.message}"</p>
							<div
								className='d-flex align-items-center'
								style={{ height: 'auto' }}
							>
								<img
									src={review_img}
									alt=''
									style={{ objectFit: 'contain', marginTop: '-.5rem' }}
								/>
								<div>
									<p className='name'> {item.name} </p>
									<p className='location'> {item.location} </p>
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default ReviewSlider
