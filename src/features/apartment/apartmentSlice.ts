import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApartmentInitialState } from './apartmentState'
import { authHeader } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'

let url = config.liveUrl
let token: string = '123'

export const getNearbyApartments = createAsyncThunk(
	'apartments/getNearbyApartments',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.get(`${url}/apartments/near/you`, {
				headers: authHeader(token),
			})

			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return rejectWithValue(message)
		}
	}
)

export const { reducer: ApartmentReducer, actions } = createSlice({
	name: 'apartment',
	initialState: ApartmentInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getNearbyApartments.fulfilled, (state, action) => {
			state.nearbyApartments = action.payload.data
			state.isFetchingNearbyApartments = false
		})
		builder.addCase(getNearbyApartments.pending, (state, action) => {
			state.isFetchingNearbyApartments = true
		})
		builder.addCase(getNearbyApartments.rejected, (state, action) => {
			state.isFetchingNearbyApartments = false
		})
	},
})

export const {} = actions
