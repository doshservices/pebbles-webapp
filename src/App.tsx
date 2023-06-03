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
import AllApartments from './pages/General/AllApartments'
import NearApartments from './pages/General/NearApartments'
import CreateListing from './pages/Dashboard/CreateListing'
import UserBookingDetail from './pages/Dashboard/UserBookingDetail'
import UserBookingDetailBusiness from './pages/Dashboard/UserBookingDetailBusiness'
import ApprovePayment from './pages/General/ApprovePayment'
import Events from './pages/General/Events'
import EventDetails from './pages/General/EventDetails'
import UserSignup from './pages/General/UserSignup'
import Ride from './pages/General/Ride'
import ApproveEventPayment from './pages/General/ApproveEventPayment'
import Food from './pages/General/Food'
import Laundry from './pages/General/Laundry'
import Voucher from './pages/General/Voucher'

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
							<Route path='all-apartments' element={<AllApartments />} />
							<Route path='apartments-near-you' element={<NearApartments />} />
							<Route path='apartments/:id' element={<ApartmentDetails />} />
							<Route path='about-us' element={<About />} />
							<Route path='contact' element={<Contact />} />
							<Route path='add-ons/ride' element={<Ride />} />
							<Route path='add-ons/voucher' element={<Voucher />} />
							<Route path='add-ons/food' element={<Food />} />
							<Route path='add-ons/laundry' element={<Laundry />} />
							<Route path='events' element={<Events />} />
							<Route
								path='event/approve-payment/:id/payment-status'
								element={<ApproveEventPayment />}
							/>
							<Route path='events/:id' element={<EventDetails />} />
						</Route>
						<Route path='/auth/' element={<AuthPath />}>
							<Route path='signup' element={<Signup />} />
							<Route path='user/signup' element={<UserSignup />} />
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
							<Route path='my-bookings/:id' element={<UserBookingDetail />} />
							<Route
								path='bookings/:id'
								element={<UserBookingDetailBusiness />}
							/>
							<Route
								path='booking/:id/payment-status'
								element={<ApprovePayment />}
							/>
							<Route path='bookings' element={<UserBusinessBookings />} />
							<Route path='wishlist' element={<UserWishlist />} />
							<Route path='listings' element={<UserListings />} />
							<Route path='listings/new/' element={<CreateListing />} />
							<Route path='listings/new/:id' element={<CreateListing />} />
							<Route path='notifications' element={<UserNotifications />} />
							<Route path='upgrade-account' element={<UserUpgrade />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster />
		</>
	)
}

export default App
