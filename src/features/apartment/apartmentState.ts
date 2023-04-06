export interface ApartmentInitialInterface {
	nearbyApartments: NearbyApartmentsInterface | null
	allApartments: NearbyApartmentsInterface | null
	userApartments: NearbyApartmentsInterface | null
	searchApartments: NearbyApartmentsInterface | null
	apartment: ApartmentDetailInterface | null
	createSuccess: boolean
	isFetchingNearbyApartments: boolean
	isFetchingSearchApartments: boolean
	isFetchingAllApartments: boolean
	isFetchingApartment: boolean
}

export const ApartmentInitialState: ApartmentInitialInterface = {
	isFetchingNearbyApartments: false,
	isFetchingSearchApartments: false,
	createSuccess: false,
	isFetchingAllApartments: false,
	isFetchingApartment: false,
	nearbyApartments: null,
	searchApartments: null,
	allApartments: null,
	userApartments: null,
	apartment: null,
}

export interface NearbyApartmentsInterface {
	apartments: ApartmentInterface[]
}

export interface ApartmentDetailInterface {
	apartment: ApartmentInterface
}

export interface ApartmentInterface {
	address: string
	apartmentCountry: string
	apartmentImages: string[]
	apartmentInfo: string
	apartmentName: string
	apartmentState: string
	facilities: string[]
	isAvailable: boolean
	landmark: any[]
	featuredImages: string[]
	numberOfBedrooms: number
	latitude: string
	longitude: string
	numberOfGuests: number
	numberOfToilets: number
	price: number
	status: string
	typeOfApartment: string
	userId: string
	_id: string
}
