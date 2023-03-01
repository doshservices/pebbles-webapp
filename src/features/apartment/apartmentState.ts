export interface ApartmentInitialInterface {
	nearbyApartments: NearbyApartmentsInterface[] | null
	searchApartments: NearbyApartmentsInterface[] | null
	isFetchingNearbyApartments: boolean
	isFetchingSearchApartments: boolean
}

export const ApartmentInitialState: ApartmentInitialInterface = {
	isFetchingNearbyApartments: false,
	isFetchingSearchApartments: false,
	nearbyApartments: null,
	searchApartments: null,
}

export interface NearbyApartmentsInterface {
	name: string
}
