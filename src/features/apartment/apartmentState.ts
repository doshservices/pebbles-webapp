export interface ApartmentInitialInterface {
	nearbyApartments: NearbyApartmentsInterface | null
	allApartments: NearbyApartmentsInterface | null
	userApartments: NearbyApartmentsInterface | null
	searchApartments: NearbyApartmentsInterface | null
	apartment: ApartmentDetailInterface | null
	savedApartment: ApartmentDetailInterface | null
	createSuccess: ApartmentDetailInterface | null
	isFetchingNearbyApartments: boolean
	isFetchingSearchApartments: boolean
	isFetchingAllApartments: boolean
	isFetchingApartment: boolean
	isDeleting: boolean
	deleteSuccess: boolean
	isCreatingApartment: boolean
	savedApartments: SavedApartmentsInterface | null
	isSavingApartment: boolean
}

export const ApartmentInitialState: ApartmentInitialInterface = {
	isFetchingNearbyApartments: false,
	isFetchingSearchApartments: false,
	createSuccess: null,
	isFetchingAllApartments: false,
	isFetchingApartment: false,
	isDeleting: false,
	nearbyApartments: null,
	searchApartments: null,
	allApartments: null,
	userApartments: null,
	apartment: null,
	deleteSuccess: false,
	isCreatingApartment: false,
	savedApartments: null,
	isSavingApartment: false,
	savedApartment: null,
}

export interface NearbyApartmentsInterface {
	apartments: ApartmentInterface[]
}

export interface SavedApartmentsInterface {
	apartment: SavedApartmentsInnerInterface[]
}

export interface SavedApartmentsInnerInterface {
	apartmentId: ApartmentInterface
	id: string
}

export interface ApartmentDetailInterface {
	apartment: ApartmentInterface
}

export interface ApartmentInterface {
	address: string
	apartmentCountry: string
	apartmentImages: any
	apartmentInfo: string
	apartmentName: string
	apartmentState: string
	facilities: string[]
	isAvailable: boolean
	landmark: any[]
	featuredImages: any
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
