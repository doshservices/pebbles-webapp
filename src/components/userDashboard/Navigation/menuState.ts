export interface MenuLinkInterface {
	id: string
	title: string
	type: string
	url: string
	icon: string
	permission: string[]
}

export interface MenuItemInterface {
	id: string
	title: string
	type: string
	icon: string
	children: MenuLinkInterface[]
}

export interface MenuNavigationInterface {
	items: MenuItemInterface[]
}
