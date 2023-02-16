const authHeader = (token: string) => ({
	Accept: 'application/json',
	Authorization: `Bearer ${token}`,
	'Content-Type': 'application/json',
	key: '75b178ee-e109-454d-bd56-0adc83665ea9',
})

const header = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	key: '75b178ee-e109-454d-bd56-0adc83665ea9',
}

export { header, authHeader }
