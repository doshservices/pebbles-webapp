import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApartmentInitialState } from './apartmentState'
import { authHeader, header } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'

let url = config.liveUrl
let token: string = '123'

export const get_nearby_apartments = createAsyncThunk(
	'apartments/get_nearby_apartments',
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

export const get_search_apartments = createAsyncThunk(
	'apartments/get_search_apartments',
	async (
		payload: {
			loc: string
			checkIn: string
			checkOut: string
			apartmentType: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		try {
			const response = await axios.get(
				`${url}/apartments-one/search?apartmentSearch=${payload.loc}`,
				{
					headers: header,
				}
			)

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
		builder.addCase(get_nearby_apartments.fulfilled, (state, action) => {
			state.nearbyApartments = action.payload.data
			state.isFetchingNearbyApartments = false
		})
		builder.addCase(get_nearby_apartments.pending, (state, action) => {
			state.isFetchingNearbyApartments = true
		})
		builder.addCase(get_nearby_apartments.rejected, (state, action) => {
			state.isFetchingNearbyApartments = false
		})
		builder.addCase(get_search_apartments.fulfilled, (state, action) => {
			state.searchApartments = action.payload.data
			state.isFetchingSearchApartments = false
		})
		builder.addCase(get_search_apartments.pending, (state, action) => {
			state.isFetchingSearchApartments = true
		})
		builder.addCase(get_search_apartments.rejected, (state, action) => {
			state.isFetchingSearchApartments = false
		})
	},
})

export const {} = actions
