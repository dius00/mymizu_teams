import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// const firebase = require("firebase");
// const firebaseui = require("firebaseui");

const config = {
	apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
	authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
	databaseURL: `${process.env.REACT_APP_DATABASEURL}`,
	projectId: `${process.env.REACT_APP_PROJECT_ID}`,
	storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
	appId: `${process.env.REACT_APP_APP_ID}`,
};
firebase.initializeApp(config);

// const db = firebase.database();
// const auth = firebase.auth();
export const db = firebase.firestore;
// export 
// export default auth;
// firebase.initializeApp(config);
export const auth = firebase.auth;
export default firebase;
