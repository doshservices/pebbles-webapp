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

	console.log(window.history)

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
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Proin nec auctor ligula, sed luctus magna. Sed placerat
										lacus auctor congue molestie. Sed facilisis felis ac commodo
										convallis. Nunc ullamcorper vehicula magna sit amet
										tincidunt. Fusce in iaculis arcu, sed posuere nisi. Etiam
										porttitor elit eget arcu malesuada dictum. Fusce sit amet
										elit viverra, laoreet risus ac, varius enim. Quisque ut
										pellentesque mi. Nullam lacus quam, imperdiet ac metus non,
										eleifend ornare massa.Morbi vestibulum erat eget massa
										sollicitudin, vel pellentesque diam posuere. Suspendisse
										scelerisque consectetur nisi, sed vulputate lacus aliquet
										sed. Orci varius natoque penatibus et magnis dis parturient
										montes, nascetur ridiculus mus. In aliquam vel nisl sit amet
										lobortis.
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Proin nec auctor ligula, sed luctus magna. Sed placerat
											lacus auctor congue molestie. Sed facilisis felis ac
											commodo convallis. Nunc ullamcorper vehicula magna sit
											amet tincidunt. Fusce in iaculis arcu, sed posuere nisi.
											Etiam porttitor elit eget arcu malesuada dictum. Fusce sit
											amet elit viverra, laoreet risus ac, varius enim. Quisque
											ut pellentesque mi. Nullam lacus quam, imperdiet ac metus
											non, eleifend ornare massa.Morbi vestibulum erat eget
											massa sollicitudin, vel pellentesque diam posuere.
											Suspendisse scelerisque consectetur nisi, sed vulputate
											lacus aliquet sed. Orci varius natoque penatibus et magnis
											dis parturient montes, nascetur ridiculus mus. In aliquam
											vel nisl sit amet lobortis.
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Proin nec auctor ligula, sed luctus magna. Sed placerat
											lacus auctor congue molestie. Sed facilisis felis ac
											commodo convallis. Nunc ullamcorper vehicula magna sit
											amet tincidunt. Fusce in iaculis arcu, sed posuere nisi.
											Etiam porttitor elit eget arcu malesuada dictum. Fusce sit
											amet elit viverra, laoreet risus ac, varius enim. Quisque
											ut pellentesque mi. Nullam lacus quam, imperdiet ac metus
											non, eleifend ornare massa.Morbi vestibulum erat eget
											massa sollicitudin, vel pellentesque diam posuere.
											Suspendisse scelerisque consectetur nisi, sed vulputate
											lacus aliquet sed. Orci varius natoque penatibus et magnis
											dis parturient montes, nascetur ridiculus mus. In aliquam
											vel nisl sit amet lobortis.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='about_team'>
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
			</section>
		</main>
	)
}

export default About
