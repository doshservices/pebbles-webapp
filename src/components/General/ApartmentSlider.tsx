import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { ApartmentInterface } from '../../features/apartment/apartmentState'
import ApartmentCard from '../ApartmentCard'

const ApartmentSlider = ({ data }: { data: ApartmentInterface[] }) => {
	const settings = {
		dots: false,
		infinite: data?.length > 3,
		speed: 1000,
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
		<div className='container '>
			{data?.length !== 0 ? (
				<div className='px_5'>
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
			) : (
				<p> No apartments found. </p>
			)}
		</div>
	)
}

export default ApartmentSlider
