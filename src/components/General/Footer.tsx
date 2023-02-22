import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import '../../styles/component.css'

const Footer = () => {
	return (
		<footer>
			<div className='footer1'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4'>
							<h6> SOCIAL MEDIA </h6>
							<p> FOLLOW PEBBLES SIGNATURE </p>
							<div className='social_links'>
								<a href='/' className='mr-3'>
									<i className='icofont-facebook'></i>
								</a>
								<a href='/' className='mr-3'>
									<i className='icofont-twitter'></i>
								</a>
								<a href='/' className='mr-3'>
									<i className='icofont-linkedin'></i>
								</a>
								<a href='/'>
									<i className='icofont-instagram'></i>
								</a>
							</div>
						</div>

						<div className='col-md-8 footer_align_right'>
							<h6> NEWSLETTER </h6>
							<p>
								subscribe to our newsletter to recieve new offers and promotions
							</p>
							<div className='row'>
								<div className='col-md-6'></div>
								<div className='col-md-6'>
									<div className='input-group mb-3 input_div'>
										<input
											type='email'
											className='form-control'
											placeholder=''
											aria-label='Enter email'
										/>
										<button className='btn btn-outline-secondary' type='button'>
											SEND
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='footer2'>
				<div className='container'>
					<div className='text-center'>
						<div className='mb-4'>
							<img src={Logo} alt='' />
						</div>
						<div className='foot_links'>
							<Link to='/' className=''>
								APARTMENT
							</Link>
							<Link to='/' className=''>
								ABOUT
							</Link>
							<Link to='/' className=''>
								CONTACT
							</Link>
							<Link to='/' className=''>
								BECOME A HOST
							</Link>
							<Link to='/' className=''>
								PRIVACY POLICY
							</Link>
						</div>
					</div>
					<div className='foot_para'>
						<div className='row'>
							<div className='col-md-6'>
								<p> &copy; 2023 Pebbles Signature, All Rights Reserved </p>
							</div>
							<div className='col-md-6 align_right'>
								<Link to=''> Site map </Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
