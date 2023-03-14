export default {
	items: [
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
					icon: 'feather icon-home',
				},
				{
					id: 'profile',
					title: 'Profile',
					type: 'item',
					url: '/user/dashboard/profile',
					icon: 'feather icon-user',
				},
				{
					id: 'submissions',
					title: 'Submissions',
					type: 'item',
					url: '/user/dashboard/submissions',
					icon: 'feather icon-upload-cloud',
				},
				{
					id: 'notifications',
					title: 'Notifications',
					type: 'item',
					url: '/user/dashboard/notifications',
					icon: 'feather icon-alert-circle',
				},
				{
					id: 'projects',
					title: 'Projects',
					type: 'item',
					url: '/user/dashboard/projects',
					icon: 'feather icon-file',
				},
			],
		},
	],
}
