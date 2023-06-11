import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { NotificationInitialState } from './notificationState'
import { authHeader, header } from '../../utils/headers'
// import toast from 'react-hot-toast'
import config from '../../utils/config'
import { store } from '../../app/store'
import { toast } from 'react-hot-toast'

let url = config.liveUrl

export const get_all_notifications = createAsyncThunk(
	'notifications/get_all_notifications',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/notifications/`, {
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

export const get_notification_by_id = createAsyncThunk(
	'notifications/get_notification_by_id',
	async (
		payload: {
			id: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.get(`${url}/notifications/${payload.id}`, {
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

export const delete_notification = createAsyncThunk(
	'notifications/delete_notification',
	async (
		payload: {
			id: string | undefined
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.delete(
				`${url}/notifications/${payload.id}`,
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

export const update_notification = createAsyncThunk(
	'notifications/update_notification',
	async (
		payload: {
			id?: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI
		let token: string | null = store.getState()?.auth?.token

		try {
			const response = await axios.put(
				`${url}/notifications/${payload.id}`,
				payload,
				{
					headers: authHeader(token ? token : '123'),
				}
			)
			toast.success(response?.data.data.message)
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

export const post_newsletter = createAsyncThunk(
	'notifications/post_newsletter',
	async (
		payload: {
			email: string
			name?: string
		},
		thunkAPI
	) => {
		const { rejectWithValue } = thunkAPI

		try {
			const response = await axios.post(`${url}/users/subscribe`, payload, {
				headers: header,
			})
			toast.success(
				'You have successfully registered to receive our newsletters.'
			)
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

export const { reducer: NotificationReducer, actions } = createSlice({
	name: 'notifications',
	initialState: NotificationInitialState,
	reducers: {
		notificationReset: (state) => {
			state.notifications = null
			state.notification = null
			state.deleteSuccess = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(get_notification_by_id.fulfilled, (state, action) => {
			state.notifications = action.payload.data
			state.isLoading = false
		})
		builder.addCase(get_notification_by_id.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(get_notification_by_id.rejected, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(delete_notification.fulfilled, (state, action) => {
			state.deleteSuccess = action.payload.data
			state.isDeleting = false
		})
		builder.addCase(delete_notification.pending, (state, action) => {
			state.isDeleting = true
		})
		builder.addCase(delete_notification.rejected, (state, action) => {
			state.isDeleting = false
		})
		builder.addCase(update_notification.fulfilled, (state, action) => {
			state.updateSuccess = true
			state.isUpdating = false
		})
		builder.addCase(update_notification.pending, (state, action) => {
			state.isUpdating = true
			state.updateSuccess = false
		})
		builder.addCase(update_notification.rejected, (state, action) => {
			state.isUpdating = false
			state.updateSuccess = false
		})
		builder.addCase(post_newsletter.fulfilled, (state, action) => {
			state.updateSuccess = true
			state.isUpdating = false
		})
		builder.addCase(post_newsletter.pending, (state, action) => {
			state.isUpdating = true
			state.updateSuccess = false
		})
		builder.addCase(post_newsletter.rejected, (state, action) => {
			state.isUpdating = false
			state.updateSuccess = false
		})
	},
})

export const { notificationReset } = actions
