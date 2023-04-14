import { ApartmentInterface } from '../apartment/apartmentState'
import { AuthInterface } from '../authentication/authenticationState'

export interface BookingInitialInterface {
	booking: BookingInterface | null
	bookings: BookingsInterface | null
	bookingDetail: BookingDetailInterface | null
	isCreatingBooking: boolean
	isFetchingBooking: boolean
	flutterBooking: FlutterBookingInterface | null
	isFlutterBooking: boolean
	isCancellingBooking: boolean
	cancelSuccess: boolean
	bookingState: SaveBookingInterface | null
}

export const BookingInitialState: BookingInitialInterface = {
	booking: null,
	bookings: null,
	bookingDetail: null,
	isCreatingBooking: false,
	isFetchingBooking: false,
	flutterBooking: null,
	isFlutterBooking: false,
	isCancellingBooking: false,
	cancelSuccess: false,
	bookingState: null,
}

export interface BookingsInterface {
	bookings: BookingInterface[]
}

export interface BookingDetailInterface {
	booking: BookingInterface
}

export interface BookingInterface {
	apartmentId: ApartmentInterface
	apartmentOwnerId: AuthInterface
	bookingAmount: number
	bookingStatus: string
	bookingUserId: AuthInterface
	apartmentState: string
	checkInDate: string
	checkOutDate: string
	createdAt: string
	dateList: string[]
	isBooked: number
	numberOfGuests: string
	paymentStatus: string
	_id: string
}

export interface FlutterBookingInterface {
	booking: string
}

export interface SaveBookingInterface {
	apartmentOwnerId: String | undefined
	apartmentId: String | undefined
	checkInDate: String | undefined
	checkOutDate: String | undefined
	bookingAmount: Number | undefined
	numberOfGuests: Number | undefined
}
