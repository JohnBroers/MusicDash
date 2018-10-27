import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyDQI0mkWlQertVa2tdjKdu3uQfT0SI3vHQ",
    authDomain: "musicdashboard-5f358.firebaseapp.com",
    databaseURL: "https://musicdashboard-5f358.firebaseio.com",
    projectId: "musicdashboard-5f358",
    storageBucket: "musicdashboard-5f358.appspot.com",
    messagingSenderId: "488363916342"
});

export const db = app.database();
export const eventsRef = db.ref('events');