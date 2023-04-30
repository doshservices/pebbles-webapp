import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// import './styles/bootstrap.min.css'
import './styles/scss/style.scss'
import './index.css'

import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')!
const root = createRoot(container)

const persistor = persistStore(store)

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
)

reportWebVitals()
