export interface EventInitialInterface {
	events: EventInterface[] | null
	event: EventInterface | null
	isFetchingEvent: boolean
	flutterEvent: FlutterEventInterface | null
	isFlutterEvent: boolean
}

export const EventInitialState: EventInitialInterface = {
	events: null,
	event: null,
	isFetchingEvent: false,
	flutterEvent: null,
	isFlutterEvent: false,
}

export interface EventsInterface {
	events: EventInterface[]
}

export interface EventDetailInterface {
	event: EventInterface
}

export interface EventInterface {
	description: string
	eventCategory: string
	eventCost: number
	eventCountry: string
	eventImages: string[]
	eventDate: string
	eventLocation: string
	eventName: string
	eventState: string
	eventTime: string
	isAvailable: boolean
	_id: string
}

export interface FlutterEventInterface {
	event: FlutterEventLinkInterface
}

export interface FlutterEventLinkInterface {
	link: string
}
