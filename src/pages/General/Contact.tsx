import React, { useLayoutEffect } from 'react'
import carouselBackground1 from '../../assets/carouselBackground1.png'
import Registration3 from '../../assets/Registration3.jpg'
import { FiMapPin } from 'react-icons/fi'
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import { AiOutlineMail } from 'react-icons/ai'

const Contact = () => {
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
				<div className='homepage_div container'>
					<div className='contact_box'>
						<div className='contact_box1'>
							<p>
								<FiMapPin />
								<span className='label'> Address : </span>
								123 Shai Hulud Street, Lagos
							</p>
						</div>
						<div className='contact_box1'>
							<p>
								<HiOutlineDevicePhoneMobile />
								<span className='label'> Phone : </span>
								0703 451 2330
							</p>
						</div>
						<div className='contact_box1'>
							<p>
								<AiOutlineMail />
								<span className='label'> Email : </span>
								info@pebblessignature.com
							</p>
						</div>
						<div className='contact_links'>
							<a href='/' className='me-3 '>
								<i className='icofont-facebook'></i>
							</a>
							<a href='/' className='me-3 '>
								<i className='icofont-twitter'></i>
							</a>
							<a href='/' className='me-3 '>
								<i className='icofont-linkedin'></i>
							</a>
							<a href='/' className=''>
								<i className='icofont-instagram'></i>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className='contact_div2'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-4 col-md-5'>
							<div className='contact_left'>
								<div>
									<h5> Where To Find Us </h5>
									<img src={Registration3} alt='' />
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Proin nec auctor ligula, sed luctus magna. Sed placerat
										lacus auctor congue molestie. Sed facilisis felis ac commodo
										convallis. Nunc ullamcorper vehicula magna sit amet
										tincidunt Nunc ullamcorper vehicula magna sit
									</p>
								</div>
								<div>
									<h5 className='mb-5 mt-5'> Working Hours </h5>
									<div className='d-flex justify-content-between'>
										<p>Mondays to Fridays </p>
										<p>8:00am - 4:00pm</p>
									</div>
									<div className='d-flex justify-content-between'>
										<p>Saturdays</p>
										<p>9:00am - 3:00pm</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-8 col-md-7'>
							<div className='contact_pad'>
								<div className='contact_right pebbles_form'>
									<h5 className=''> Get In Touch </h5>
									<form>
										<label htmlFor='fullName'>Full Name</label>
										<input
											type='text'
											placeholder='First name here'
											className='form-control'
										/>
										<label htmlFor='fullName'>Email Address</label>
										<input
											type='text'
											placeholder='Email address here'
											className='form-control'
										/>
										<label htmlFor='fullName'>Message</label>
										<textarea
											className='form-control'
											placeholder='Type your message here'
										></textarea>

										<div className='mt-5 text-end'>
											<button className='btn btn-primary'>Send Message</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Contact
