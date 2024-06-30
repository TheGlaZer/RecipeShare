// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6zrPJroaG3qYH0BIAC8rrrHPrFbRHv-0",
    authDomain: "menushare-f0786.firebaseapp.com",
    projectId: "menushare-f0786",
    storageBucket: "menushare-f0786.appspot.com",
    messagingSenderId: "1027341318831",
    appId: "1:1027341318831:web:ed07d040cff744020c725a",
    measurementId: "G-920LB12P43"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { firebase, db, storage, auth };