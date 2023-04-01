import { getApp, getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCQ7VZQ9_v1Rb6a46T-HKZTBXsEKG_t_1I',
	authDomain: 'dobrey-app.firebaseapp.com',
	databaseURL: 'https://dobrey-app.firebaseio.com',
	projectId: 'dobrey-app',
	storageBucket: 'dobrey-app.appspot.com',
	messagingSenderId: '185904216257',
	appId: '1:185904216257:web:36757e26662e5ebde63c40',
	measurementId: 'G-LJWR2S4WPW',
};

/**
 * @NOTE: clientska cast
 */
const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
