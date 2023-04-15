export interface AuthInitialInterface {
	user_detail: AuthInterface | null
	user_register: AuthInterface | null
	token: string | null
	otp: OTPInterface | null
	verifyOtp: OTPInterface | null
	isLoading: boolean
}

export const AuthInitialState: AuthInitialInterface = {
	isLoading: false,
	user_detail: null,
	user_register: null,
	otp: null,
	token: null,
	verifyOtp: null,
}

export interface AuthInterface {
	email: string
	lastName?: string
	firstName?: string
	isVerified: boolean
	businessName?: string
	phoneNumber: string
	role: string
	status: string
	_id: string
	profilePicture?: string
	country?: string
	city?: string
	state?: string
	address?: string
	businessAddress?: string
	cacDocument?: string
	validId?: string
}

export interface OTPInterface {
	code: number
	data: string
	message: string
	status: number
}
