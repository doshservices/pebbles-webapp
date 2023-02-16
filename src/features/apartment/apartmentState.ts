export interface ApartmentInitialInterface {
	nearbyApartments: NearbyApartmentsInterface[] | null
	isFetchingNearbyApartments: boolean
}

export const ApartmentInitialState: ApartmentInitialInterface = {
	isFetchingNearbyApartments: false,
	nearbyApartments: null,
}

export interface NearbyApartmentsInterface {
	name: string
}
