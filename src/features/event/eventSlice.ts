import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { EventInitialState } from './eventState'
import { authHeader, header } from '../../utils/headers'
import config from '../../utils/config'
import { store } from '../../app/store'
import { toast } from 'react-hot-toast'

let url = config.liveUrl

export const get_events = createAsyncThunk(
	'event/get_events',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.get(`${url}/events`, {
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

export const get_event_by_id = createAsyncThunk(
	'event/get_event_by_id',
	async (
		payload: {
			id: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		// let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/events/one/${payload.id}`, {
				// headers: authHeader(token ? token : '123'),
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

export const flutter_pay_event = createAsyncThunk(
	'event/flutter_pay_event',
	async (
		payload: {
			eventId: string | undefined
			paymentMethod: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/events/pay-for-event?eventId=${payload.eventId}&paymentMethod=${payload.paymentMethod}`,
				{
					headers: authHeader(token ? token : '123'),
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

export const flutter_verify_event = createAsyncThunk(
	'booking/flutter_verify_booking',
	async (
		payload: {
			transaction_id: any
			amount: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/events/verify-event-payment/?transaction_id=${payload.transaction_id}&amount=${payload.amount}`,
				{
					headers: authHeader(token ? token : '123'),
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

export const get_search_events = createAsyncThunk(
	'events/get_search_events',
	async (
		payload: {
			loc: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		try {
			const response = await axios.get(
				`${url}/events/?location=${payload.loc}`,
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

export const { reducer: EventReducer, actions } = createSlice({
	name: 'event',
	initialState: EventInitialState,
	reducers: {
		reset: (state) => {
			state.event = null
			state.events = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(get_events.fulfilled, (state, action) => {
			state.events = action.payload.data
			state.isFetchingEvent = false
		})
		builder.addCase(get_events.pending, (state, action) => {
			state.isFetchingEvent = true
		})
		builder.addCase(get_events.rejected, (state, action) => {
			state.isFetchingEvent = false
		})
		builder.addCase(get_search_events.fulfilled, (state, action) => {
			state.events = action.payload.data
			state.isFetchingEvent = false
		})
		builder.addCase(get_search_events.pending, (state, action) => {
			state.isFetchingEvent = true
		})
		builder.addCase(get_search_events.rejected, (state, action) => {
			state.isFetchingEvent = false
		})
		builder.addCase(get_event_by_id.fulfilled, (state, action) => {
			state.event = action.payload.data.event
			state.isFetchingEvent = false
		})
		builder.addCase(get_event_by_id.pending, (state, action) => {
			state.isFetchingEvent = true
		})
		builder.addCase(get_event_by_id.rejected, (state, action) => {
			state.isFetchingEvent = false
		})
		builder.addCase(flutter_pay_event.fulfilled, (state, action) => {
			state.flutterEvent = action.payload.data
			state.isFlutterEvent = false
		})
		builder.addCase(flutter_pay_event.pending, (state, action) => {
			state.isFlutterEvent = true
		})
		builder.addCase(flutter_pay_event.rejected, (state, action) => {
			state.isFlutterEvent = false
		})
	},
})

export const { reset } = actions
