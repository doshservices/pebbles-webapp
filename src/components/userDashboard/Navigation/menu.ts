import { MenuItemInterface } from './menuState'
let items: MenuItemInterface[]
items = [
	{
		id: 'navigation',
		title: '',
		type: 'group',
		icon: 'icon-navigation',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/user/dashboard/home',
				icon: 'fa fa-cube',
				permission: ['USER', 'INDIVIDUAL', 'BUSINESS'],
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				url: '/user/dashboard/profile',
				icon: 'fa fa-user',
				permission: ['USER', 'INDIVIDUAL', 'BUSINESS'],
			},
			{
				id: 'my-bookings',
				title: 'My Bookings',
				type: 'item',
				url: '/user/dashboard/my-bookings',
				icon: 'fas fa-building',
				permission: ['USER', 'INDIVIDUAL', 'BUSINESS'],
			},
			{
				id: 'bookings',
				title: 'Bookings',
				type: 'item',
				url: '/user/dashboard/bookings',
				icon: 'fa fa-city',
				permission: ['BUSINESS', 'INDIVIDUAL'],
			},
			{
				id: 'listings',
				title: 'Listings',
				type: 'item',
				url: '/user/dashboard/listings',
				icon: 'fa fa-hotel',
				permission: ['INDIVIDUAL', 'BUSINESS'],
			},
			{
				id: 'wishlist',
				title: 'Wishlist',
				type: 'item',
				url: '/user/dashboard/wishlist',
				icon: 'fa fa-heart',
				permission: ['USER', 'INDIVIDUAL', 'BUSINESS'],
			},
			{
				id: 'notifications',
				title: 'Notifications',
				type: 'item',
				url: '/user/dashboard/notifications',
				icon: 'fa fa-bell',
				permission: ['USER', 'INDIVIDUAL', 'BUSINESS'],
			},
		],
	},
]

export default items
