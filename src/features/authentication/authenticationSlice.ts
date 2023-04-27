import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AuthInitialState, AuthInitialInterface } from './authenticationState'
import { REHYDRATE } from 'redux-persist'
import { authHeader, header } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'
import { RehydrateAppAction } from '../../types/types'
import { newState } from '../../utils/newState'
import { store } from '../../app/store'
import toast from 'react-hot-toast'

let url = config.liveUrl

function rehydrate(
	state: AuthInitialInterface,
	rehydrateParams: RehydrateAppAction
) {
	return newState(rehydrateParams.payload?.auth || state, {
		user_detail: rehydrateParams.payload?.auth?.user_detail ?? null,
		token: rehydrateParams.payload?.auth?.token ?? null,
	})
}

export const user_signup = createAsyncThunk(
	'auth/user_signup',
	async (
		payload: {
			firstName?: string | undefined
			lastName?: string | undefined
			businessName?: string | undefined
			email: string
			password: string
			phoneNumber: string
			googleSigned: boolean
			role: string
			// otp: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/users`, payload, {
				headers: header,
			})
			toast.success(`${payload.email} signed up successfully`)
			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			toast.error(message?.message)

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

export const verify_otp = createAsyncThunk(
	'auth/verify_otp',
	async (payload: { token: string }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/users/verify`, payload, {
				headers: header,
			})
			toast.success('OTP verified successfully')
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
			toast.error(message)

			return rejectWithValue(message)
		}
	}
)

export const user_update = createAsyncThunk(
	'auth/user_update',
	async (
		payload: {
			firstName?: string | undefined
			businessName?: string | undefined
			businessAddress?: string | undefined
			lastName?: string | undefined
			phoneNumber: string | undefined
			state: string | undefined
			country: string | undefined
			city: string | undefined
			profilePicture: string | undefined
			validId: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.put(`${url}/users`, payload, {
				headers: authHeader(token ? token : '123'),
			})
			store.dispatch(user_refresh_profile())

			toast.success('Profile updated successfully')

			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			toast.error(message)

			return rejectWithValue(message)
		}
	}
)

export const user_refresh_profile = createAsyncThunk(
	'auth/user_refresh_profile',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token
		try {
			const response = await axios.get(`${url}/users`, {
				headers: authHeader(token ? token : '123'),
			})

			let passedData = {
				data: { ...response.data },
				token,
			}

			return passedData
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

export const forgot_password = createAsyncThunk(
	'auth/forgot_password',
	async (
		payload: {
			newPassword: string
			token: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(
				`${url}/users/reset-password`,
				payload,
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
			toast.error(message?._message)

			return rejectWithValue(message)
		}
	}
)

// export const reset_password = createAsyncThunk(
// 	'auth/reset_password',
// 	async (
// 		payload: {
// 			newPassword: string
// 			token: string
// 		},
// 		thunkAPI
// 	) => {
// 		const { rejectWithValue } = thunkAPI

// 		try {
// 			const response = await axios.post(
// 				`${url}/users/reset-password`,
// 				payload,
// 				{
// 					headers: header,
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
// 			toast.error(message?._message)

// 			return rejectWithValue(message)
// 		}
// 	}
// )

export const change_user_type = createAsyncThunk(
	'auth/change_user_type',
	async (
		payload: {
			validId: string
			businessAddress: string
			businessName: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.post(
				`${url}/users/change-user-type`,
				payload,
				{
					headers: authHeader(token ? token : '123'),
				}
			)

			toast.success('Form submitted successfully.')

			return response.data
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			toast.error(message?._message)

			return rejectWithValue(message)
		}
	}
)

export const { reducer: AuthReducer, actions } = createSlice({
	name: 'auth',
	initialState: AuthInitialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.otp = null
			state.token = null
			state.user_detail = null
			state.user_register = null
			state.verifyOtp = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, rehydrate)
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
		builder.addCase(verify_otp.fulfilled, (state, action) => {
			state.verifyOtp = action.payload.data
			state.isLoading = false
		})
		builder.addCase(verify_otp.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(verify_otp.rejected, (state, action) => {
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
		builder.addCase(user_update.fulfilled, (state, action) => {
			state.user_detail = action.payload.data.userDetails
			state.token = action.payload.data.token
			state.isLoading = false
		})
		builder.addCase(user_update.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(user_update.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(user_refresh_profile.fulfilled, (state, action) => {
			state.user_detail = action.payload.data.data.user
			state.token = action.payload.token
			state.isLoading = false
		})
		builder.addCase(user_refresh_profile.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(user_refresh_profile.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(forgot_password.fulfilled, (state, action) => {
			state.user_register = action.payload.data
			state.isLoading = false
		})
		builder.addCase(forgot_password.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(forgot_password.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(change_user_type.fulfilled, (state, action) => {
			// state.user_detail = action.payload.data.userDetails
			state.isLoading = false
		})
		builder.addCase(change_user_type.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(change_user_type.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export const { reset } = actions
