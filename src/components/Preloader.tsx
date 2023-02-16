import React from 'react'
import Logo from '../assets/loader_ball.svg'

const Preloader = () => {
	return (
		<div id='preloader-active'>
			<div className='preloader d-flex align-items-center justify-content-center'>
				<div className='preloader-inner position-relative'>
					<div className='preloader-circle'></div>
					<div className='preloader-img pere-text'>
						<img
							className='logo'
							alt='Logo'
							src={Logo}
							width='30px'
							height='30px'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Preloader
