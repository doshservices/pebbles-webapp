import { combineReducers } from 'redux'
import { ApartmentReducer } from './features/apartment/apartmentSlice'
import { AuthReducer } from './features/authentication/authenticationSlice'

export const rootReducer = combineReducers({
	apartment: ApartmentReducer,
	auth: AuthReducer,
})

// export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
