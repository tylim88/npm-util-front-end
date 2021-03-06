import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@mui/material'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDL0KLwkHoYHni0vQzeafOEYd-bgqA0m2A',
	authDomain: 'npm-util.firebaseapp.com',
	projectId: 'npm-util',
	storageBucket: 'npm-util.appspot.com',
	messagingSenderId: '251547626039',
	appId: '1:251547626039:web:bd09863880d6cdd9edadb2',
	measurementId: 'G-S4EQXMD5YN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
logEvent(analytics, 'notification_received')

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
