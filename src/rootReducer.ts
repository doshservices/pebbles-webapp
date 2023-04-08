import { combineReducers } from 'redux'
import { ApartmentReducer } from './features/apartment/apartmentSlice'
import { AuthReducer } from './features/authentication/authenticationSlice'
import { NotificationReducer } from './features/notification/notificationSlice'

export const rootReducer = combineReducers({
	apartment: ApartmentReducer,
	auth: AuthReducer,
	notification: NotificationReducer,
})

// export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
