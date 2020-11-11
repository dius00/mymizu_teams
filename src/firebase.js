import firebase from "firebase";
// import "firebase/auth";
// import "firebase/app";

const firebaseui = require("firebaseui");

const config = {
	apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
	authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
	databaseURL: `${process.env.REACT_APP_DATABASEURL}`,
	projectId: `${process.env.REACT_APP_PROJECT_ID}`,
	storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
	appId: `${process.env.REACT_APP_APP_ID}`,
	measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export default firebase;

