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
				permission: ['USER', 'BUSINESS'],
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				url: '/user/dashboard/profile',
				icon: 'fa fa-user',
				permission: ['USER', 'BUSINESS'],
			},
			{
				id: 'my-bookings',
				title: 'My Bookings',
				type: 'item',
				url: '/user/dashboard/my-bookings',
				icon: 'fas fa-building',
				permission: ['USER', 'BUSINESS'],
			},
			{
				id: 'bookings',
				title: 'Bookings',
				type: 'item',
				url: '/user/dashboard/bookings',
				icon: 'fa fa-city',
				permission: ['BUSINESS'],
			},
			{
				id: 'listings',
				title: 'Listings',
				type: 'item',
				url: '/user/dashboard/listings',
				icon: 'fa fa-hotel',
				permission: ['BUSINESS'],
			},
			{
				id: 'guests',
				title: 'Guests',
				type: 'item',
				url: '/user/dashboard/guests',
				icon: 'fa fa-users',
				permission: ['BUSINESS'],
			},
			{
				id: 'wishlist',
				title: 'Wishlist',
				type: 'item',
				url: '/user/dashboard/wishlist',
				icon: 'fa fa-heart',
				permission: ['USER', 'BUSINESS'],
			},
			{
				id: 'notifications',
				title: 'Notifications',
				type: 'item',
				url: '/user/dashboard/notifications',
				icon: 'fa fa-bell',
				permission: ['USER', 'BUSINESS'],
			},
			{
				id: 'upgrade-account',
				title: 'Upgrade Account',
				type: 'item',
				url: '/user/dashboard/upgrade-account',
				icon: 'fa fa-user-tie',
				permission: ['USER'],
			},
		],
	},
]

export default items
