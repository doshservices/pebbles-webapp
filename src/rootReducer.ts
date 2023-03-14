import { combineReducers } from 'redux'
import { ApartmentReducer } from './features/apartment/apartmentSlice'
import { AuthReducer } from './features/authentication/authenticationSlice'

const rootReducer = combineReducers({
	apartment: ApartmentReducer,
	auth: AuthReducer,
})

export default rootReducer
