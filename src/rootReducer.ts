import { combineReducers } from 'redux'
import { ApartmentReducer } from './features/apartment/apartmentSlice'

const rootReducer = combineReducers({
	apartment: ApartmentReducer,
})

export default rootReducer
