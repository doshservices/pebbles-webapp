export interface AuthInitialInterface {
	user_detail: AuthInterface | null
	user_register: AuthInterface | null
	token: string | null
	otp: OTPInterface | null
	isLoading: boolean
}

export const AuthInitialState: AuthInitialInterface = {
	isLoading: false,
	user_detail: null,
	user_register: null,
	otp: null,
	token: null,
}

export interface AuthInterface {
	email: string
	fullName?: string
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
}

export interface OTPInterface {
	code: number
	data: string
	message: string
	status: number
}
