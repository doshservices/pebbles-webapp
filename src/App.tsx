import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Preloader from './components/Preloader'

import GeneralPath from './GeneralPath'
import Index from './pages/General/Index'
import SearchApartments from './pages/General/SearchApartments'
import ApartmentDetails from './pages/General/ApartmentDetails'
import About from './pages/General/About'
import Contact from './pages/General/Contact'
import Signup from './pages/General/Signup'
import Login from './pages/General/Login'
import AuthPath from './AuthPath'
import ForgotPassword from './pages/General/ForgotPassword'
import UserPath from './UserPath'
import UserDashboardHome from './pages/Dashboard/UserDashboardHome'
import UserProfile from './pages/Dashboard/UserProfile'
import UserBookings from './pages/Dashboard/UserBookings'
import UserBusinessBookings from './pages/Dashboard/UserBusinessBookings'
import UserWishlist from './pages/Dashboard/UserWishlist'
import UserListings from './pages/Dashboard/UserListings'
import UserNotifications from './pages/Dashboard/UserNotifications'
import UserUpgrade from './pages/Dashboard/UserUpgrade'
import UserGuests from './pages/Dashboard/UserGuests'

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<Preloader />}>
					<Routes>
						{/* ------------------------------ genral routes  ---------------------------------- */}
						<Route path='/' element={<Navigate replace to='/home' />} />
						<Route path='/' element={<GeneralPath />}>
							<Route path='home' element={<Index />} />
							<Route path='search-apartments' element={<SearchApartments />} />
							<Route path='apartments/:id' element={<ApartmentDetails />} />
							<Route path='about-us' element={<About />} />
							<Route path='contact' element={<Contact />} />
						</Route>
						<Route path='/auth/' element={<AuthPath />}>
							<Route path='signup' element={<Signup />} />
							<Route path='login' element={<Login />} />
							<Route path='forgot-password' element={<ForgotPassword />} />
						</Route>

						<Route
							path='/user/dashboard'
							element={<Navigate replace to='/user/dashboard/home' />}
						/>
						<Route path='/user/dashboard/' element={<UserPath />}>
							<Route path='home' element={<UserDashboardHome />} />
							<Route path='profile' element={<UserProfile />} />
							<Route path='my-bookings' element={<UserBookings />} />
							<Route path='bookings' element={<UserBusinessBookings />} />
							<Route path='wishlist' element={<UserWishlist />} />
							<Route path='listings' element={<UserListings />} />
							<Route path='notifications' element={<UserNotifications />} />
							<Route path='upgrade-account' element={<UserUpgrade />} />
							<Route path='guests' element={<UserGuests />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</>
	)
}

export default App
