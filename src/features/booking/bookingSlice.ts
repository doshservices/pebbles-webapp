import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BookingInitialState } from './bookingState'
import { authHeader, header } from '../../utils/headers'
import config from '../../utils/config'
import { store } from '../../app/store'
import { toast } from 'react-hot-toast'

let url = config.liveUrl

export const create_booking = createAsyncThunk(
	'booking/create_booking',
	async (
		payload: {
			apartmentOwnerId: String | undefined
			apartmentId: String | undefined
			checkInDate: String | undefined
			checkOutDate: String | undefined
			bookingAmount: Number | undefined
			numberOfGuests: Number | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.post(
				`${url}/bookings/create-booking`,
				payload,
				{
					headers: authHeader(token ? token : '123'),
				}
			)
			toast.success(response?.data.message)
			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			toast.error(message[0])

			return rejectWithValue(message)
		}
	}
)

export const get_user_bookings = createAsyncThunk(
	'booking/get_user_bookings',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/bookings/booking-by-userId`, {
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

export const get_booking_by_id = createAsyncThunk(
	'booking/get_booking_by_id',
	async (
		payload: {
			id: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/bookings/${payload.id}`, {
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

export const flutter_pay_booking = createAsyncThunk(
	'booking/flutter_pay_booking',
	async (
		payload: {
			bookingId: string | undefined
			paymentMethod: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/bookings/pay-for/booking?bookingId=${payload.bookingId}&paymentMethod=${payload.paymentMethod}`,
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

export const get_business_bookings = createAsyncThunk(
	'booking/get_business_bookings',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/bookings/busines-individual-booking`,
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

export const cancel_booking = createAsyncThunk(
	'booking/cancel_booking',
	async (
		payload: {
			bookingId: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/bookings/cancel-booking/${payload.bookingId}`,
				{
					headers: authHeader(token ? token : '123'),
				}
			)
			toast.success(response?.data?.data?.message)
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

export const flutter_verify_booking = createAsyncThunk(
	'booking/flutter_verify_booking',
	async (
		payload: {
			transaction_id: any
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(
				`${url}/bookings/verify-payment/${payload.transaction_id}`,
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

export const { reducer: BookingReducer, actions } = createSlice({
	name: 'booking',
	initialState: BookingInitialState,
	reducers: {
		reset: (state) => {
			state.booking = null
			state.bookings = null
		},
		save_booking_to_state: (state, action) => {
			state.bookingState = action.payload
		},
		delete_booking_from_state: (state) => {
			state.bookingState = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(create_booking.fulfilled, (state, action) => {
			state.booking = action.payload.data
			state.isCreatingBooking = false
		})
		builder.addCase(create_booking.pending, (state, action) => {
			state.isCreatingBooking = true
		})
		builder.addCase(create_booking.rejected, (state, action) => {
			state.isCreatingBooking = false
		})
		builder.addCase(get_user_bookings.fulfilled, (state, action) => {
			state.bookings = action.payload.data
			state.isFetchingBooking = false
		})
		builder.addCase(get_user_bookings.pending, (state, action) => {
			state.isFetchingBooking = true
		})
		builder.addCase(get_user_bookings.rejected, (state, action) => {
			state.isFetchingBooking = false
		})
		builder.addCase(get_booking_by_id.fulfilled, (state, action) => {
			state.bookingDetail = action.payload.data
			state.isFetchingBooking = false
		})
		builder.addCase(get_booking_by_id.pending, (state, action) => {
			state.isFetchingBooking = true
		})
		builder.addCase(get_booking_by_id.rejected, (state, action) => {
			state.isFetchingBooking = false
		})
		builder.addCase(flutter_pay_booking.fulfilled, (state, action) => {
			state.flutterBooking = action.payload.data
			state.isFlutterBooking = false
		})
		builder.addCase(flutter_pay_booking.pending, (state, action) => {
			state.isFlutterBooking = true
		})
		builder.addCase(flutter_pay_booking.rejected, (state, action) => {
			state.isFlutterBooking = false
		})
		builder.addCase(get_business_bookings.fulfilled, (state, action) => {
			state.bookings = action.payload.data
			state.isFetchingBooking = false
		})
		builder.addCase(get_business_bookings.pending, (state, action) => {
			state.isFetchingBooking = true
		})
		builder.addCase(get_business_bookings.rejected, (state, action) => {
			state.isFetchingBooking = false
		})
		builder.addCase(cancel_booking.fulfilled, (state, action) => {
			state.cancelSuccess = true
			state.isCancellingBooking = false
		})
		builder.addCase(cancel_booking.pending, (state, action) => {
			state.isCancellingBooking = true
			state.cancelSuccess = false
		})
		builder.addCase(cancel_booking.rejected, (state, action) => {
			state.isCancellingBooking = false
			state.cancelSuccess = false
		})
		builder.addCase(flutter_verify_booking.fulfilled, (state, action) => {
			state.flutterVerify = action.payload.data
			state.isFlutterVerify = false
		})
		builder.addCase(flutter_verify_booking.pending, (state, action) => {
			state.isFlutterVerify = true
		})
		builder.addCase(flutter_verify_booking.rejected, (state, action) => {
			state.isFlutterVerify = false
		})
	},
})

export const { reset, save_booking_to_state, delete_booking_from_state } =
	actions
