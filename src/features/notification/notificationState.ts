export interface NotificationInitialInterface {
	notifications: NotificationsInterface | null
	notification: NotificationDetailInterface | null
	isLoading: boolean
	deleteSuccess: boolean
	isDeleting: boolean
	updateSuccess: boolean
	isUpdating: boolean
}

export const NotificationInitialState: NotificationInitialInterface = {
	notifications: null,
	notification: null,
	isLoading: false,
	deleteSuccess: false,
	isDeleting: false,
	updateSuccess: false,
	isUpdating: false,
}

export interface NotificationsInterface {
	notifications: NotificationInfoInterface[]
}

export interface NotificationDetailInterface {
	notification: NotificationInfoInterface
}

export interface NotificationInfoInterface {
	isRead: boolean
	bookingUserId: string
	bookingId: BookingIdInterface
	message: string
	image: string
	notificationType: string
	createdAt: boolean
	apartmentId: ApartmentIdInterface
	price: number
	_id: string
}

export interface BookingIdInterface {
	bookingStatus: string
	createdAt: string
	_id: string
	bookingAmount: string
}

export interface ApartmentIdInterface {
	apartmentImages: string[]
	apartmentName: string
	_id: string
}
