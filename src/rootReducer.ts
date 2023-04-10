import { combineReducers } from 'redux'
import { ApartmentReducer } from './features/apartment/apartmentSlice'
import { AuthReducer } from './features/authentication/authenticationSlice'
import { NotificationReducer } from './features/notification/notificationSlice'
import { BookingReducer } from './features/booking/bookingSlice'

export const rootReducer = combineReducers({
	apartment: ApartmentReducer,
	auth: AuthReducer,
	notification: NotificationReducer,
	booking: BookingReducer,
})

// export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
