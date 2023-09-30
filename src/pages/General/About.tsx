import React, { useLayoutEffect } from 'react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import who from '../../assets/who.png'
import what from '../../assets/what.png'
import where from '../../assets/where.png'
import team1 from '../../assets/team/team1.png'
import team2 from '../../assets/team/team2.png'

const About = () => {
	const team = [
		{
			name: 'Brain Scott',
			image: team1,
			role: 'Founder',
		},
		{
			name: 'Petri Dish',
			image: team2,
			role: 'Co-Founder',
		},
		{
			name: 'Ogedengbe Taiwo',
			image: team1,
			role: 'Head of Technology',
		},
		{
			name: 'Kelvin Fashina',
			image: team2,
			role: 'Head of Accounts',
		},
	]
	const RouteToTop = () => {
		window.scrollTo(0, 0)
	}

	useLayoutEffect(() => {
		RouteToTop()
	}, [])

	return (
		<main className='about_page'>
			<section
				style={{ backgroundImage: `url(${carouselBackground1})` }}
				className='about_page_bg'
			>
				<div className='homepage_div container text-center'>
					<h1>ABOUT US</h1>
					<p>
						Stay in comfort and style with our highly rated service apartments.
					</p>
				</div>
			</section>

			<section className='about_page_section'>
				<div className='container'>
					<div className='about_pad'>
						<div className='row'>
							<div className='col-md-6 col-sm-12 mb-5'>
								<div className=''>
									<img src={who} alt='' />
								</div>
							</div>
							<div className='col-md-6 col-sm-12 mb-5'>
								<div className='about_text'>
									<h3>WHO WE ARE</h3>
									<p>
										At Pebbles Signatures, hospitality is not just a service;
										it's our passion, our commitment, and our way of life. We
										are more than just a hospitality brand; we are your trusted
										partner in creating memorable experiences. Established with
										a vision to redefine the way you experience hospitality,
										Pebbles Signatures has emerged as a name synonymous with
										luxury, comfort, and convenience. Our journey began with a
										simple yet profound idea: to offer a place where every guest
										feels not just welcome but truly at home. Over time, we've
										transformed this vision into reality, evolving into a
										renowned name in the world of hospitality. We are Pebbles
										Signatures, where every moment is crafted to perfection, and
										every stay is an unforgettable journey.
									</p>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6 col-sm-12 mb-5 order-first order-md-last '>
									<img src={what} alt='' />
								</div>
								<div className='col-md-6 col-sm-12 mb-5 order-last order-md-first'>
									<div className='about_text'>
										<h3>WHAT WE DO</h3>
										<p>
											At Pebbles Signatures, we pride ourselves on being your
											all-in-one solution for hospitality. We go beyond offering
											mere accommodations; we curate experiences that leave a
											lasting imprint on your memory. Our comprehensive range of
											services includes:
										</p>
										<ul>
											<li>
												<strong>Short-Let Apartments:</strong> Immerse yourself
												in the perfect blend of comfort, style, and convenience
												in our short-let apartments.
											</li>
											<li>
												<strong>Chauffeur Services:</strong> Travel with ease
												and comfort, as our professional drivers take you to
												your destination safely.
											</li>
											<li>
												<strong>Party Apartments:</strong> Celebrate life's
												milestones in our unique party apartments, designed for
												gatherings, birthdays, and special occasions.
											</li>
											<li>
												<strong>Events:</strong> Transform your events into
												extraordinary experiences with our event planning
												services.
											</li>
											<li>
												<strong>Tourist Attractions:</strong> Explore the
												culture and beauty of your destination with our curated
												tourist attraction services.
											</li>
											<li>
												<strong>Jet Services:</strong> Elevate your travel
												experience with our luxurious jet services, making your
												journey as extraordinary as your destination.
											</li>
										</ul>
										<p>
											At Pebbles Signatures, we are more than just a place to
											stay; we are a destination where moments are created,
											experiences are treasured, and hospitality is elevated to
											an art form.
										</p>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6 col-sm-12 mb-5'>
									<img src={where} alt='' />
								</div>
								<div className='col-md-6 col-sm-12 mb-5'>
									<div className='about_text'>
										<h3>WHERE WE WANT TO BE </h3>
										<p>
											Our vision is to be the global epitome of exceptional
											hospitality, where the Pebbles Signatures experience
											becomes synonymous with unparalleled luxury, seamless
											convenience, and unwavering quality. We aspire to expand
											our footprint, reaching travellers and event hosts
											worldwide, offering them a unique and memorable
											hospitality experience that exceeds their expectations. We
											strive to continuously innovate, setting new standards in
											the industry and pioneering new ways to enhance the guest
											experience. Our journey is a quest for excellence, and our
											destination is to be the preferred choice for discerning
											travellers and event organizers seeking the finest in
											hospitality.
										</p>

										<p>
											Welcome to Pebbles Signatures – Where Hospitality is
											Elevated to a Signature Experience.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <section className='about_team'>
				<div className='container'>
					<h2 className='text-center mb-4 pb-2' style={{ fontWeight: '600' }}>
						MEET THE TEAM
					</h2>
					<div className='row row-mobile'>
						{team.map((item, index) => (
							<div className='col' key={index}>
								<img src={item.image} alt='' />
								<h4> {item.name} </h4>
								<p> {item.role} </p>
							</div>
						))}
					</div>
				</div>
			</section> */}
		</main>
	)
}

export default About
