import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AuthInitialState } from './authenticationState'
import { authHeader, header } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'

let url = config.liveUrl
let token: string = '123'

export const user_signup = createAsyncThunk(
	'auth/user_signup',
	async (
		payload: {
			firstName: string
			lastName: string
			email: string
			password: string
			phoneNumber: string
			googleSigned: boolean
			role: string
			otp: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/users`, payload, {
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

export const get_otp = createAsyncThunk(
	'auth/get_otp',
	async (payload: { email: string }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/send-token`, payload, {
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

export const user_login = createAsyncThunk(
	'auth/user_login',
	async (payload: { loginId: string; password: string }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/users/login`, payload, {
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

// export const get_search_apartments = createAsyncThunk(
// 	'apartments/get_search_apartments',
// 	async (
// 		payload: {
// 			loc: string
// 			checkIn: string
// 			checkOut: string
// 			apartmentType: string
// 		},
// 		thunkAPI
// 	) => {
// 		const { rejectWithValue } = thunkAPI
// 		try {
// 			const response = await axios.get(
// 				`${url}/apartments-one/search?apartmentSearch=${payload.loc}`,
// 				{
// 					headers: authHeader(token),
// 				}
// 			)

// 			return response.data
// 		} catch (error: any) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString()

// 			return rejectWithValue(message)
// 		}
// 	}
// )

export const { reducer: AuthReducer, actions } = createSlice({
	name: 'auth',
	initialState: AuthInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(user_signup.fulfilled, (state, action) => {
			state.user_register = action.payload.data.newUser
			state.isLoading = false
		})
		builder.addCase(user_signup.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(user_signup.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(get_otp.fulfilled, (state, action) => {
			state.otp = action.payload.data
			state.isLoading = false
		})
		builder.addCase(get_otp.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(get_otp.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(user_login.fulfilled, (state, action) => {
			state.user_detail = action.payload.data.userDetails
			state.token = action.payload.data.token
			state.isLoading = false
		})
		builder.addCase(user_login.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(user_login.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export const {} = actions
