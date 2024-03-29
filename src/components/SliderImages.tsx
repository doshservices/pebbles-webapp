import React from 'react'
import Slider from 'react-slick'

const SliderImages = ({ images }: { images: any[] }) => {
	const settings2 = {
		dots: true,
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		arrows: true,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 1000,
		pauseOnHover: false,
	}

	return (
		<div className='images_slider'>
			<Slider {...settings2}>
				{images?.map((item: string, index: number) => (
					<img src={item} alt='' key={index} className='img-fluid' />
				))}
			</Slider>
		</div>
	)
}

export default SliderImages
