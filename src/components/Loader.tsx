import React from 'react'
import Logo from '../assets/loader_ball.svg'

const Loader = () => {
	return (
		<div id='preloader-active' style={{ minHeight: '100vh' }}>
			<div className='preloader d-flex align-items-center justify-content-center'>
				<div className='preloader-inner position-relative'>
					<div className='preloader-img pere-text'>
						<div
							className='d-flex justify-content-content'
							style={{ alignItems: 'center', height: '100vh' }}
						>
							<img
								className='logo'
								alt='Logo'
								src={Logo}
								width='100px'
								height='100px'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loader
