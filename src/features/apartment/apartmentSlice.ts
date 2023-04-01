import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApartmentInitialState } from './apartmentState'
import { authHeader, header } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'
import { store } from '../../app/store'

let url = config.liveUrl

export const get_nearby_apartments = createAsyncThunk(
	'apartments/get_nearby_apartments',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/apartments/near/you`, {
				headers: authHeader(token ? token : '123'),
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
				`${url}/apartments-one/search?state=${payload.loc}&type=${payload.apartmentType}`,
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

export const get_all_apartments = createAsyncThunk(
	'apartments/get_all_apartments',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		try {
			const response = await axios.get(`${url}/apartments/all-apartments`, {
				headers: header,
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

export const get_apartment_by_id = createAsyncThunk(
	'apartments/get_apartment_by_id',
	async (
		payload: {
			id: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.get(`${url}/apartments/${payload.id}`, {
				headers: header,
			})

			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			console.log(error)

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
		builder.addCase(get_all_apartments.fulfilled, (state, action) => {
			state.allApartments = action.payload.data
			state.isFetchingAllApartments = false
		})
		builder.addCase(get_all_apartments.pending, (state, action) => {
			state.isFetchingAllApartments = true
		})
		builder.addCase(get_all_apartments.rejected, (state, action) => {
			state.isFetchingAllApartments = false
		})
		builder.addCase(get_apartment_by_id.fulfilled, (state, action) => {
			state.apartment = action.payload.data
			state.isFetchingApartment = false
		})
		builder.addCase(get_apartment_by_id.pending, (state, action) => {
			state.isFetchingApartment = true
		})
		builder.addCase(get_apartment_by_id.rejected, (state, action) => {
			state.isFetchingApartment = false
		})
	},
})

export const {} = actions
