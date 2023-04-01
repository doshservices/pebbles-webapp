export interface ApartmentInitialInterface {
	nearbyApartments: NearbyApartmentsInterface | null
	allApartments: NearbyApartmentsInterface | null
	searchApartments: NearbyApartmentsInterface | null
	apartment: ApartmentDetailInterface | null
	isFetchingNearbyApartments: boolean
	isFetchingSearchApartments: boolean
	isFetchingAllApartments: boolean
	isFetchingApartment: boolean
}

export const ApartmentInitialState: ApartmentInitialInterface = {
	isFetchingNearbyApartments: false,
	isFetchingSearchApartments: false,
	isFetchingAllApartments: false,
	isFetchingApartment: false,
	nearbyApartments: null,
	searchApartments: null,
	allApartments: null,
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
	landmark: string[]
	numberOfBedrooms: number
	numberOfGuests: number
	numberOfRooms: number
	numberOfToilets: number
	price: number
	typeOfApartment: string
	userId: string
	_id: string
}
