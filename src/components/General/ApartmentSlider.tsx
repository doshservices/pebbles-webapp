import React from 'react'
import Slider from 'react-slick'
import { ApartmentInterface } from '../../features/apartment/apartmentState'
import ApartmentCard from '../ApartmentCard'

const ApartmentSlider = ({ data }: { data: ApartmentInterface[] }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 400,
		slidesToShow: 3,
		arrows: true,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 9000,
		pauseOnHover: true,
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
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 576,
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
				{data.map((item, index) => {
					return index <= 5 ? (
						<div key={index} className='p_4'>
							<ApartmentCard apartmentInfo={item} />
						</div>
					) : null
				})}
			</Slider>
		</div>
	)
}

export default ApartmentSlider
